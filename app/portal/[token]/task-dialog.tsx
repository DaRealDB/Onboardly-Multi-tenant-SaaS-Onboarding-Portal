import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Types
interface TaskDialogProps {
  task: any; // Replace with ClientTask if imported
  isOpen: boolean;
  onClose: () => void;
}

// Component
export function TaskDialog({ task, isOpen, onClose }: TaskDialogProps) {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>
            {task.description || "No description provided."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">{/* Content */}</div>
      </DialogContent>
    </Dialog>
  );
}
