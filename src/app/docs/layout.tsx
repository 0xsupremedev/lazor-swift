import { Navigation } from '@/components/Navigation';
import { DocsLayout } from '@/components/DocsLayout';

export default function DocsRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navigation />
            <DocsLayout>{children}</DocsLayout>
        </>
    );
}
