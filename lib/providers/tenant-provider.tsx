'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './auth-provider'
import type { Tenant, TenantStats } from '@/lib/types/database'

interface TenantContextType {
  tenant: Tenant | null
  tenants: Tenant[]
  isLoading: boolean
  stats: TenantStats | null
  setCurrentTenant: (tenant: Tenant) => void
  refreshTenants: () => Promise<void>
  createTenant: (data: Partial<Tenant>) => Promise<{ data: Tenant | null; error: string | null }>
  updateTenant: (id: string, data: Partial<Tenant>) => Promise<{ error: string | null }>
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<TenantStats | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchTenants = useCallback(async () => {
    if (!user) {
      setTenants([])
      setTenant(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tenants:', error)
      setIsLoading(false)
      return
    }

    setTenants(data || [])
    
    // Set first tenant as current if none selected
    if (data && data.length > 0 && !tenant) {
      setTenant(data[0])
    }
    
    setIsLoading(false)
  }, [user, supabase, tenant])

  const fetchStats = useCallback(async () => {
    if (!tenant) {
      setStats(null)
      return
    }

    const { data: clients } = await supabase
      .from('clients')
      .select('*')
      .eq('tenant_id', tenant.id)

    if (!clients) {
      setStats(null)
      return
    }

    const totalClients = clients.length
    const activeClients = clients.filter(c => c.status === 'in_progress').length
    const completedClients = clients.filter(c => c.status === 'complete').length
    
    // Calculate average completion time for completed clients
    const completedWithTime = clients.filter(c => c.completed_at && c.started_at)
    const averageCompletionTime = completedWithTime.length > 0
      ? completedWithTime.reduce((acc, c) => {
          const start = new Date(c.started_at!).getTime()
          const end = new Date(c.completed_at!).getTime()
          return acc + (end - start)
        }, 0) / completedWithTime.length / (1000 * 60 * 60 * 24) // Convert to days
      : 0

    const completionRate = totalClients > 0 
      ? (completedClients / totalClients) * 100 
      : 0

    setStats({
      totalClients,
      activeClients,
      completedClients,
      averageCompletionTime: Math.round(averageCompletionTime * 10) / 10,
      completionRate: Math.round(completionRate),
    })
  }, [tenant, supabase])

  useEffect(() => {
    fetchTenants()
  }, [fetchTenants])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const setCurrentTenant = (newTenant: Tenant) => {
    setTenant(newTenant)
  }

  const refreshTenants = async () => {
    await fetchTenants()
  }

  const createTenant = async (data: Partial<Tenant>) => {
    if (!user) {
      return { data: null, error: 'Not authenticated' }
    }

    const { data: newTenant, error } = await supabase
      .from('tenants')
      .insert({
        ...data,
        owner_id: user.id,
      })
      .select()
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    await fetchTenants()
    return { data: newTenant, error: null }
  }

  const updateTenant = async (id: string, data: Partial<Tenant>) => {
    const { error } = await supabase
      .from('tenants')
      .update(data)
      .eq('id', id)

    if (error) {
      return { error: error.message }
    }

    await fetchTenants()
    return { error: null }
  }

  return (
    <TenantContext.Provider value={{
      tenant,
      tenants,
      isLoading,
      stats,
      setCurrentTenant,
      refreshTenants,
      createTenant,
      updateTenant,
    }}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}
