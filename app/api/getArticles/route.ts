import { NextRequest, NextResponse } from 'next/server';
import db from '@/utils/firebaseConfig';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'articles'));
    const articlesData = snapshot.docs.map((doc: DocumentData) => ({
      id: doc.id,
      title: doc.data().title,
      author: doc.data().author,
      comments: doc.data().comments,
      coverImageUrl: doc.data().coverImageUrl,
      datePublished: doc.data().datePublished,
      timeToRead: doc.data().timeToRead,
      url: doc.data().url,
      views: doc.data().views,
    }));
    return NextResponse.json({ articles: articlesData });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
