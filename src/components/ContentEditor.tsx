import { useState } from 'react';
import { Save, Edit3, Home, ArrowLeft } from 'lucide-react';
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
      case 'about': return 'About Section';
      case 'services': return 'Services Section';
      case 'myaim': return 'My Aim Section';
      case 'contact': return 'Contact Section';
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
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setEditData(newData);
  };

  const updateArrayField = (path: string, index: number, field: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...editData };
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    if (!current[keys[keys.length - 1]]) {
      current[keys[keys.length - 1]] = [];
    }
    
    if (!current[keys[keys.length - 1]][index]) {
      current[keys[keys.length - 1]][index] = {};
    }
    
    current[keys[keys.length - 1]][index][field] = value;
    setEditData(newData);
  };

  const addArrayItem = (path: string, defaultItem: any) => {
    const keys = path.split('.');
    const newData = { ...editData };
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    if (!current[keys[keys.length - 1]]) {
      current[keys[keys.length - 1]] = [];
    }
    
    current[keys[keys.length - 1]].push(defaultItem);
    setEditData(newData);
  };

  const removeArrayItem = (path: string, index: number) => {
    const keys = path.split('.');
    const newData = { ...editData };
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]].splice(index, 1);
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
          {/* Hero Section Editor */}
          {section === 'hero' && editData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Greeting</Label>
                      <Input 
                        value={editData.greeting || ''} 
                        onChange={(e) => updateField('greeting', e.target.value)} 
                        placeholder="e.g., Assalamu Alaikum"
                      />
                    </div>
                    <div>
                      <Label>Name</Label>
                      <Input 
                        value={editData.name || ''} 
                        onChange={(e) => updateField('name', e.target.value)} 
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Tagline</Label>
                    <Textarea 
                      value={editData.tagline || ''} 
                      onChange={(e) => updateField('tagline', e.target.value)} 
                      rows={3}
                      placeholder="Your professional tagline"
                    />
                  </div>
                  <div>
                    <Label>Islamic Quote</Label>
                    <Input 
                      value={editData.islamicQuote || ''} 
                      onChange={(e) => updateField('islamicQuote', e.target.value)} 
                      placeholder="Arabic quote"
                    />
                  </div>
                  <div>
                    <Label>Quote Translation</Label>
                    <Input 
                      value={editData.islamicQuoteTranslation || ''} 
                      onChange={(e) => updateField('islamicQuoteTranslation', e.target.value)} 
                      placeholder="English translation"
                    />
                  </div>
                  <div>
                    <Label>Profile Image URL</Label>
                    <Input 
                      value={editData.profileImage || ''} 
                      onChange={(e) => updateField('profileImage', e.target.value)} 
                      placeholder="https://..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Call-to-Action Buttons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Primary Button Text</Label>
                    <Input 
                      value={editData.ctaButtons?.primary || ''} 
                      onChange={(e) => updateField('ctaButtons.primary', e.target.value)} 
                      placeholder="Primary button text"
                    />
                  </div>
                  <div>
                    <Label>Secondary Button Text</Label>
                    <Input 
                      value={editData.ctaButtons?.secondary || ''} 
                      onChange={(e) => updateField('ctaButtons.secondary', e.target.value)} 
                      placeholder="Secondary button text"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editData.stats?.map((stat: any, index: number) => (
                    <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                      <div>
                        <Label>Value</Label>
                        <Input 
                          value={stat.value || ''} 
                          onChange={(e) => updateArrayField('stats', index, 'value', e.target.value)} 
                          placeholder="e.g., 100+"
                        />
                      </div>
                      <div>
                        <Label>Label</Label>
                        <Input 
                          value={stat.label || ''} 
                          onChange={(e) => updateArrayField('stats', index, 'label', e.target.value)} 
                          placeholder="e.g., Projects"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Section Editor */}
          {section === 'navigation' && editData && (
            <Card>
              <CardHeader>
                <CardTitle>Navigation Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Brand Name</Label>
                  <Input 
                    value={editData.brandName || ''} 
                    onChange={(e) => updateField('brandName', e.target.value)} 
                    placeholder="Your brand name"
                  />
                </div>
                <div>
                  <Label>Menu Items</Label>
                  <div className="space-y-2">
                    {editData.menuItems?.map((item: any, index: number) => (
                      <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                        <div>
                          <Label>Name</Label>
                          <Input 
                            value={item.name || ''} 
                            onChange={(e) => updateArrayField('menuItems', index, 'name', e.target.value)} 
                            placeholder="Menu item name"
                          />
                        </div>
                        <div>
                          <Label>Link</Label>
                          <Input 
                            value={item.href || ''} 
                            onChange={(e) => updateArrayField('menuItems', index, 'href', e.target.value)} 
                            placeholder="#section or /page"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* About Section Editor */}
          {section === 'about' && editData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input 
                      value={editData.title || ''} 
                      onChange={(e) => updateField('title', e.target.value)} 
                      placeholder="Section title"
                    />
                  </div>
                  <div>
                    <Label>Description Paragraphs</Label>
                    {editData.description?.map((desc: string, index: number) => (
                      <div key={index} className="space-y-2">
                        <Textarea 
                          value={desc || ''} 
                          onChange={(e) => {
                            const newDesc = [...editData.description];
                            newDesc[index] = e.target.value;
                            updateField('description', newDesc);
                          }} 
                          rows={3}
                          placeholder={`Paragraph ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Services Section Editor */}
          {section === 'services' && editData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Services Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input 
                      value={editData.title || ''} 
                      onChange={(e) => updateField('title', e.target.value)} 
                      placeholder="Services section title"
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Textarea 
                      value={editData.subtitle || ''} 
                      onChange={(e) => updateField('subtitle', e.target.value)} 
                      rows={3}
                      placeholder="Services section subtitle"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Contact Section Editor */}
          {section === 'contact' && editData && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Title</Label>
                  <Input 
                    value={editData.title || ''} 
                    onChange={(e) => updateField('title', e.target.value)} 
                    placeholder="Contact section title"
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Textarea 
                    value={editData.subtitle || ''} 
                    onChange={(e) => updateField('subtitle', e.target.value)} 
                    rows={2}
                    placeholder="Contact section subtitle"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* My Aim Section Editor */}
          {section === 'myaim' && editData && (
            <Card>
              <CardHeader>
                <CardTitle>My Aim Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input 
                    value={editData.title || ''} 
                    onChange={(e) => updateField('title', e.target.value)} 
                    placeholder="My Aim section title"
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Textarea 
                    value={editData.subtitle || ''} 
                    onChange={(e) => updateField('subtitle', e.target.value)} 
                    rows={3}
                    placeholder="My Aim section subtitle"
                  />
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={handleCancel}>
              <ArrowLeft className="mr-2 h-4 w-4" />
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
            <CardTitle>Current Content Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {section === 'hero' && (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {content.hero.name}</p>
                  <p><strong>Greeting:</strong> {content.hero.greeting}</p>
                  <p><strong>Tagline:</strong> {content.hero.tagline}</p>
                  <p><strong>Primary Button:</strong> {content.hero.ctaButtons.primary}</p>
                  <p><strong>Secondary Button:</strong> {content.hero.ctaButtons.secondary}</p>
                </div>
              )}
              
              {section === 'navigation' && (
                <div className="space-y-2">
                  <p><strong>Brand Name:</strong> {content.navigation.brandName}</p>
                  <p><strong>Menu Items:</strong> {content.navigation.menuItems.map(item => item.name).join(', ')}</p>
                </div>
              )}
              
              {section === 'about' && (
                <div className="space-y-2">
                  <p><strong>Title:</strong> {content.about.title}</p>
                  <p><strong>Description:</strong> {content.about.description.join(' ')}</p>
                </div>
              )}
              
              {section === 'services' && (
                <div className="space-y-2">
                  <p><strong>Title:</strong> {content.services.title}</p>
                  <p><strong>Subtitle:</strong> {content.services.subtitle}</p>
                </div>
              )}
              
              {section === 'contact' && (
                <div className="space-y-2">
                  <p><strong>Title:</strong> {content.contact.title}</p>
                  <p><strong>Subtitle:</strong> {content.contact.subtitle}</p>
                </div>
              )}
              
              {section === 'myaim' && (
                <div className="space-y-2">
                  <p><strong>Title:</strong> {content.myAim.title}</p>
                  <p><strong>Subtitle:</strong> {content.myAim.subtitle}</p>
                </div>
              )}
              
              <p className="text-muted-foreground mt-4">Click "Edit Content" to customize this section.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentEditor;