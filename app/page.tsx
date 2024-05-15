"use client";

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Article {
  id: string;
  title: string;
  author: string;
  comments: string;
  coverImageUrl: string;
  datePublished: string;
  timeToRead: string;
  url: string;
  views: string;
}

interface ArticleContent {
  content: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [articleContent, setArticleContent] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/getArticles');
        const data = await res.json();
        setArticles(data.articles);
      } catch (error) {
        setError('Failed to fetch articles');
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  const handleGenerateClick = async (url: string) => {
    try {
      const res = await fetch('/api/getArticleContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.summary) {
        setArticleContent(data.summary);
      } else {
        setArticleContent(null);
      }
    } catch (error) {
      console.error('Error fetching article content:', error);
      setArticleContent(null);
    }
  };

  const handleClose = () => {
    setArticleContent(null);
  };

  return (
    <main className="flex gap-8 flex-col-reverse px-0 md:px-12 lg:px-40 xl:px-80">
      {error && <p className="text-red-500">{error}</p>}
      {articles.map(article => (
        <Card key={article.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
            <CardDescription>By {article.author}</CardDescription>
          </CardHeader>
          <div className="relative w-11/12 mx-auto" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
            <Image
              className='absolute w-full h-full object-cover rounded-lg mx-auto'
              src={article.coverImageUrl}
              alt={article.title}
              layout="fill"
            />
          </div>
          <CardContent className="w-full mt-5">
            <p>Date Published: {article.datePublished}</p>
            <p>Time to Read: {article.timeToRead}</p>
            <p>Comments: {article.comments}</p>
            <p>Views: {article.views}</p>
          </CardContent>
          <CardFooter className="w-full flex gap-5">
            <Button>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="secondary" onClick={() => handleGenerateClick(article.url)}>
                  Summarize ✨
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Summary</AlertDialogTitle>
                  <AlertDialogDescription>
                    {articleContent ? (
                      <p>{articleContent}</p>
                    ) : (
                      'Loading...'
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleClose}>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </main>
  );
};

export default Home;
