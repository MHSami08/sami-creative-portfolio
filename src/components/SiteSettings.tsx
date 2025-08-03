import { useState } from 'react';
import { Download, Upload, RotateCcw, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SiteSettingsProps {
  onExport: () => void;
  onImport: (data: string) => void;
  onReset: () => void;
}

const SiteSettings = ({ onExport, onImport, onReset }: SiteSettingsProps) => {
  const [importData, setImportData] = useState('');

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportData(content);
      };
      reader.readAsText(file);
    }
  };

  const handleImport = () => {
    if (importData.trim()) {
      try {
        onImport(importData.trim());
        setImportData('');
        // Show success message
        alert('Content imported successfully!');
      } catch (error) {
        alert('Failed to import content. Please check the JSON format.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Site Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your site content, backup, and restore settings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Backup & Export */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-500" />
              Backup & Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Download your complete site content as a JSON file for backup or migration.
            </p>
            <Button onClick={onExport} className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Site Content
            </Button>
          </CardContent>
        </Card>

        {/* Import & Restore */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-500" />
              Import & Restore
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload a previously exported JSON file to restore your site content.
            </p>
            
            <div className="space-y-3">
              <Label htmlFor="file-upload" className="text-sm font-medium">
                Upload JSON File
              </Label>
              <input
                id="file-upload"
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="paste-content" className="text-sm font-medium">
                Or Paste JSON Content
              </Label>
              <Textarea
                id="paste-content"
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder="Paste your exported JSON content here..."
                rows={6}
                className="font-mono text-xs"
              />
            </div>

            <Button 
              onClick={handleImport} 
              disabled={!importData.trim()}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600"
            >
              <Upload className="mr-2 h-4 w-4" />
              Import Content
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reset Section */}
      <Card className="bg-card/80 backdrop-blur-sm border-red-400/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4">
            <h4 className="font-semibold text-red-400 mb-2">Reset All Content</h4>
            <p className="text-sm text-muted-foreground mb-4">
              This will permanently delete all your custom content and restore the site to its default state. 
              This action cannot be undone.
            </p>
            <Button 
              onClick={() => {
                if (confirm('This will permanently delete all your custom content and restore the site to its default state. This action cannot be undone. Are you sure?')) {
                  onReset();
                  alert('Site content has been reset to defaults.');
                }
              }} 
              variant="destructive"
              className="bg-red-500 hover:bg-red-600"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Tips */}
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            Performance Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Keep image URLs optimized and use CDNs when possible</p>
            <p>• Avoid extremely long text content in single fields</p>
            <p>• Regularly backup your content using the export feature</p>
            <p>• Use descriptive titles and alt text for better SEO</p>
            <p>• Test your content changes on different devices</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettings;