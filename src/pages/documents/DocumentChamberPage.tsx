import React, { useState } from 'react';
import { FileText, Upload, Eye, PenTool } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

type DocumentStatus = 'Draft' | 'In Review' | 'Signed';

interface ChamberDocument {
    id: number;
    name: string;
    type: string;
    status: DocumentStatus;
    uploadedAt: string;
}

const initialDocuments: ChamberDocument[] = [
    {
        id: 1,
        name: 'Investment Agreement.pdf',
        type: 'PDF',
        status: 'Draft',
        uploadedAt: '2024-03-01',
    },
    {
        id: 2,
        name: 'Shareholder Contract.docx',
        type: 'Document',
        status: 'In Review',
        uploadedAt: '2024-03-03',
    },
    {
        id: 3,
        name: 'NDA Signed.pdf',
        type: 'PDF',
        status: 'Signed',
        uploadedAt: '2024-03-05',
    },
];

const statusVariant = (status: DocumentStatus) => {
    switch (status) {
        case 'Draft':
            return 'secondary';
        case 'In Review':
            return 'warning';
        case 'Signed':
            return 'success';
        default:
            return 'secondary';
    }
};

export const DocumentChamberPage: React.FC = () => {
    const [documents, setDocuments] = useState(initialDocuments);
    const [selectedDoc, setSelectedDoc] = useState<ChamberDocument | null>(null);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Document Processing Chamber
                    </h1>
                    <p className="text-gray-600">
                        Manage contracts, review documents, and sign digitally
                    </p>
                </div>

                <Button leftIcon={<Upload size={18} />}>
                    Upload Document
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Document List */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <h2 className="text-lg font-medium text-gray-900">
                            Contract Documents
                        </h2>
                    </CardHeader>

                    <CardBody className="space-y-2">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                                onClick={() => setSelectedDoc(doc)}
                            >
                                <div className="p-2 bg-primary-50 rounded-lg mr-4">
                                    <FileText size={22} className="text-primary-600" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">
                                        {doc.name}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        Uploaded {doc.uploadedAt}
                                    </p>
                                </div>

                                <Badge variant={statusVariant(doc.status)}>
                                    {doc.status}
                                </Badge>
                            </div>
                        ))}
                    </CardBody>
                </Card>

                {/* Preview & Signature */}
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-medium text-gray-900">
                            Document Actions
                        </h2>
                    </CardHeader>

                    <CardBody className="space-y-4">
                        {selectedDoc ? (
                            <>
                                {/* Selected Info */}
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        {selectedDoc.name}
                                    </h3>
                                    <Badge variant={statusVariant(selectedDoc.status)}>
                                        {selectedDoc.status}
                                    </Badge>
                                </div>

                                {/* Preview */}
                                <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                                    <Eye className="mx-auto text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-600">
                                        Document preview placeholder
                                    </p>
                                </div>

                                {/* Signature Mock */}
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <PenTool size={16} />
                                        <span className="text-sm font-medium">
                                            E-Signature
                                        </span>
                                    </div>

                                    <div className="h-24 border border-dashed rounded-md flex items-center justify-center text-sm text-gray-400">
                                        Signature Pad (Mock)
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button size="sm" className="flex-1">
                                        Mark as Signed
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        Send for Review
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-gray-500 text-center">
                                Select a document to preview & sign
                            </p>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
