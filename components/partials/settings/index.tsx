'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SettingPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [notification, setNotification] = useState(true);

  const onSave = () => {
    // submit API here
    setIsEdit(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-xl font-bold">Settings</div>
        {!isEdit ? (
          <Button variant="outline" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        ) : null}
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="space-y-6 pt-6">
          {/* Notification */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Notification</Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable app notifications
              </p>
            </div>

            <Switch
              checked={notification}
              disabled={!isEdit}
              onCheckedChange={setNotification}
            />
          </div>

          {/* Action */}
          {isEdit && (
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
              <Button onClick={onSave}>Save Changes</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
