import { NextRequest, NextResponse } from 'next/server';
import db from '@/utils/firebaseConfig';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { openai } from '@/lib/openai';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  try {
    const q = query(collection(db, 'articleData'), where('url', '==', url));
    const querySnapshot = await getDocs(q);
    const articleDoc = querySnapshot.docs[0];
    const articleData = articleDoc?.data();

    if (!articleData) {
      console.log('Article not found:', url);
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Check if summary already exists
    if (articleData.summary) {
      console.log('Summary already exists:', articleData.summary);
      return NextResponse.json({ summary: articleData.summary });
    }

    // Concatenate content fields of specific types
    const contentString = articleData.content
      .filter((item: { type: string; content: string }) => item.type === 'text' || item.type === 'textHeader')
      .map((item: { content: string }) => item.content)
      .join(' ');

    console.log('Content string:', contentString);

    console.log('Requesting summary from OpenAI...');

    // Request summary from OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Please provide a short and punchy summary no longer than 400 characters or 65 words.',
        },
        {
          role: 'user',
          content: contentString,
        },
      ],
    });

    const summary = response.choices[0]?.message?.content?.trim() ?? '';
    console.log('Summary:', summary);

    if (!summary) {
      return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
    }

    console.log('Saving summary to Firebase...');
    // Save the summary back to Firebase, this will update the 'summary' field if it exists or create it if it doesn't.
    await updateDoc(doc(db, 'articleData', articleDoc.id), { summary }).then(() => {
      console.log('Summary saved successfully');
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error fetching or processing article content:', error);
    return NextResponse.json({ error: 'Failed to fetch or process article content' }, { status: 500 });
  }
}
