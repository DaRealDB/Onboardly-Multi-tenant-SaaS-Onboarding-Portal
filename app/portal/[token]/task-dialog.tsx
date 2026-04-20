import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ClientTask, Tenant } from "@/lib/types/database";

interface TaskDialogProps {
  task: ClientTask | null;
  tenant: Tenant;
  token: string;
  onClose: () => void;
}

export function TaskDialog({ task, tenant, token, onClose }: TaskDialogProps) {
  if (!task) return null;

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.name}</DialogTitle>
          <DialogDescription>
            {task.description || "No description provided."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4"></div>
      </DialogContent>
    </Dialog>
  );
}
