import { useState } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ContentEditorProps {
  title: string;
  description: string;
  content: any;
  onSave: (data: any) => void;
}

const ContentEditor = ({ title, description, content, onSave }: ContentEditorProps) => {
  const [formData, setFormData] = useState(content);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(formData);
    toast({
      title: "Content Updated",
      description: "Your changes have been saved and will appear on the live site",
    });
  };

  const updateField = (path: string, value: any) => {
    setFormData((prev: any) => {
      const keys = path.split('.');
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addArrayItem = (path: string, defaultItem: any) => {
    const current = getNestedValue(formData, path) || [];
    updateField(path, [...current, defaultItem]);
  };

  const removeArrayItem = (path: string, index: number) => {
    const current = getNestedValue(formData, path) || [];
    updateField(path, current.filter((_: any, i: number) => i !== index));
  };

  const updateArrayItem = (path: string, index: number, value: any) => {
    const current = getNestedValue(formData, path) || [];
    const newArray = [...current];
    newArray[index] = value;
    updateField(path, newArray);
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const renderField = (key: string, value: any, path = '') => {
    const fullPath = path ? `${path}.${key}` : key;

    if (Array.isArray(value)) {
      return (
        <div key={fullPath} className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (key === 'menuItems') {
                  addArrayItem(fullPath, { name: '', href: '' });
                } else if (key === 'stats') {
                  addArrayItem(fullPath, { value: '', label: '' });
                } else if (key === 'values' || key === 'principles' || key === 'goals') {
                  addArrayItem(fullPath, { title: '', description: '' });
                } else if (key === 'timeline') {
                  addArrayItem(fullPath, { year: '', title: '', description: '', status: 'future' });
                } else if (key === 'services') {
                  addArrayItem(fullPath, { title: '', description: '', features: [], status: '' });
                } else if (key === 'contactInfo') {
                  addArrayItem(fullPath, { type: '', value: '', label: '' });
                } else {
                  addArrayItem(fullPath, '');
                }
              }}
              className="h-8"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {value.map((item: any, index: number) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  {typeof item === 'string' ? (
                    <Input
                      value={item}
                      onChange={(e) => updateArrayItem(fullPath, index, e.target.value)}
                      placeholder={`${key} item ${index + 1}`}
                    />
                  ) : (
                    <Card className="p-3 bg-muted/30">
                      <div className="space-y-2">
                        {Object.entries(item).map(([subKey, subValue]) => (
                          <div key={subKey}>
                            <Label className="text-xs text-muted-foreground capitalize">
                              {subKey.replace(/([A-Z])/g, ' $1')}
                            </Label>
                            {subKey === 'features' && Array.isArray(subValue) ? (
                              <Textarea
                                value={(subValue as string[]).join(', ')}
                                onChange={(e) => {
                                  const features = e.target.value.split(',').map(f => f.trim()).filter(Boolean);
                                  const newItem = { ...item, [subKey]: features };
                                  updateArrayItem(fullPath, index, newItem);
                                }}
                                placeholder="Feature 1, Feature 2, Feature 3"
                                rows={2}
                              />
                            ) : subKey === 'status' ? (
                              <select
                                value={subValue as string}
                                onChange={(e) => {
                                  const newItem = { ...item, [subKey]: e.target.value };
                                  updateArrayItem(fullPath, index, newItem);
                                }}
                                className="w-full px-2 py-1 text-sm border border-input rounded bg-background"
                              >
                                <option value="completed">Completed</option>
                                <option value="current">Current</option>
                                <option value="future">Future</option>
                                <option value="Learning">Learning</option>
                                <option value="Planning">Planning</option>
                              </select>
                            ) : (
                              <Input
                                value={subValue as string}
                                onChange={(e) => {
                                  const newItem = { ...item, [subKey]: e.target.value };
                                  updateArrayItem(fullPath, index, newItem);
                                }}
                                className="text-sm"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeArrayItem(fullPath, index)}
                  className="text-red-500 hover:text-red-600 h-8 w-8 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <Card key={fullPath} className="p-4 bg-muted/30">
          <h4 className="font-medium mb-3 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
          <div className="space-y-4">
            {Object.entries(value).map(([subKey, subValue]) =>
              renderField(subKey, subValue, fullPath)
            )}
          </div>
        </Card>
      );
    }

    return (
      <div key={fullPath} className="space-y-2">
        <Label htmlFor={fullPath} className="text-sm font-medium capitalize">
          {key.replace(/([A-Z])/g, ' $1')}
        </Label>
        {key.includes('description') || key.includes('Description') || key === 'subtitle' ? (
          <Textarea
            id={fullPath}
            value={value || ''}
            onChange={(e) => updateField(fullPath, e.target.value)}
            rows={3}
            className="resize-none"
          />
        ) : (
          <Input
            id={fullPath}
            value={value || ''}
            onChange={(e) => updateField(fullPath, e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-emerald-500 to-emerald-600">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Content Form */}
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Edit Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(content).map(([key, value]) =>
            renderField(key, value)
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ContentEditor;