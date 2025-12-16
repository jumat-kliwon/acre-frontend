'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProfilePage() {
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    email: 'user@email.com',
    package: 'Premium',
    name: 'John Doe',
    dob: '',
    gender: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSave = () => {
    // submit API here
    setIsEdit(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="text-xl font-bold">Profile</div>
        {!isEdit ? (
          <Button variant="outline" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        ) : null}
      </div>
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={form.email} disabled />
          </div>

          {/* Package */}
          <div className="space-y-2">
            <Label>Active Package</Label>
            <Input value={form.package} disabled />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={form.name}
              disabled={!isEdit}
              onChange={(e) => onChange('name', e.target.value)}
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label>Date of Birth (optional)</Label>
            <Input
              type="date"
              value={form.dob}
              disabled={!isEdit}
              onChange={(e) => onChange('dob', e.target.value)}
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>Gender (optional)</Label>
            <Select
              disabled={!isEdit}
              value={form.gender}
              onValueChange={(v) => onChange('gender', v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone Number (optional)</Label>
            <Input
              value={form.phone}
              disabled={!isEdit}
              onChange={(e) => onChange('phone', e.target.value)}
            />
          </div>

          {/* Password */}
          {isEdit && (
            <>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => onChange('password', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => onChange('confirmPassword', e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEdit(false)}>
                  Cancel
                </Button>
                <Button onClick={onSave}>Save Changes</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
