import { useState } from 'react';
import { Save, Edit3, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { SiteContent } from '@/utils/contentManager';

interface ContentEditorProps {
  section: keyof SiteContent;
  content: SiteContent;
  onUpdate: (section: keyof SiteContent, data: any) => void;
}

const ContentEditor = ({ section, content, onUpdate }: ContentEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const { toast } = useToast();

  const getSectionTitle = () => {
    switch (section) {
      case 'hero': return 'Hero Section';
      case 'navigation': return 'Navigation Menu';
      default: return 'Content Editor';
    }
  };

  const handleEdit = () => {
    setEditData(JSON.parse(JSON.stringify(content[section])));
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(section, editData);
    setIsEditing(false);
    setEditData(null);
    toast({
      title: "Content Updated",
      description: `${getSectionTitle()} has been updated successfully`,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...editData };
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setEditData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Home className="w-5 h-5" />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {getSectionTitle()}
            </h1>
            <p className="text-muted-foreground">Customize your {getSectionTitle().toLowerCase()} content</p>
          </div>
        </div>
        
        {!isEditing && (
          <Button onClick={handleEdit} className="bg-gradient-to-r from-blue-500 to-blue-600">
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Content
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          {section === 'hero' && (
            <Card>
              <CardHeader>
                <CardTitle>Hero Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input value={editData.name} onChange={(e) => updateField('name', e.target.value)} />
                </div>
                <div>
                  <Label>Tagline</Label>
                  <Textarea value={editData.tagline} onChange={(e) => updateField('tagline', e.target.value)} rows={2} />
                </div>
                <div>
                  <Label>Primary Button Text</Label>
                  <Input value={editData.ctaButtons.primary} onChange={(e) => updateField('ctaButtons.primary', e.target.value)} />
                </div>
                <div>
                  <Label>Secondary Button Text</Label>
                  <Input value={editData.ctaButtons.secondary} onChange={(e) => updateField('ctaButtons.secondary', e.target.value)} />
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-emerald-500 to-emerald-600">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Current Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Click "Edit Content" to customize this section.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentEditor;