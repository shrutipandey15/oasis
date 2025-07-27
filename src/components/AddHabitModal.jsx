import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AddHabitModal({ isOpen, setIsOpen, addTask }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = () => {
    if (name.trim()) {
      addTask({ name: name.trim(), frequency });
      setIsOpen(false);
      setName("");
      setFrequency("daily");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Plant a New Seed</DialogTitle>
          <DialogHeader>
            <DialogDescription>
              Add a new habit to your garden. Choose a name and how often you
              want to tend to it.
            </DialogDescription>
          </DialogHeader>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Habit
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Meditate 🧘‍♀️"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Frequency</Label>
            <RadioGroup
              defaultValue="daily"
              value={frequency}
              onValueChange={setFrequency}
              className="col-span-3 flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="r1" />
                <Label htmlFor="r1">Daily</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="r2" />
                <Label htmlFor="r2">Weekly</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Plant Seed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
