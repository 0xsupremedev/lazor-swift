import { Navigation } from '@/components/Navigation';

export default function BlogPage() {
    const posts = [
        {
            title: "Announcing LazorSwift: The fastest way to build on Solana",
            date: "Jan 5, 2026",
            excerpt: "Learn how we built LazorSwift to simplify Solana onboarding using Passkeys and AA.",
            slug: "announcing-lazorswift"
        },
        {
            title: "Why Passkeys are the future of Crypto UX",
            date: "Jan 1, 2026",
            excerpt: "Phishing-resistant, hardware-bound, and seedless. Why biometrics exceed seed phrases.",
            slug: "future-of-crypto-ux"
        },
        {
            title: "Mastering Gasless Transactions with LazorKit",
            date: "Dec 28, 2025",
            excerpt: "A deep dive into paymasters and sponsored transactions on Solana.",
            slug: "gasless-tutorial"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <Navigation />
            <main className="max-w-4xl mx-auto px-6 py-24">
                <h1 className="text-5xl font-bold mb-4 tracking-tight">Blog</h1>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-16">
                    Updates, tutorials, and insights from the LazorSwift team.
                </p>

                <div className="space-y-12">
                    {posts.map((post) => (
                        <article key={post.slug} className="group cursor-pointer">
                            <div className="text-sm text-zinc-500 mb-2">{post.date}</div>
                            <h2 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                                {post.excerpt}
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold border-b-2 border-zinc-900 dark:border-white pb-1">
                                Read More
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}
