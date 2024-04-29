import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client)


async function fetchInterpretation(id: string) {
    try {
        const interpretation = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            'Interpretation',
            id
        )
        return interpretation
    } catch (error) {
        console.error('Error Interpreting :', error);
        throw new Error('failed to interpret');
    }
}


//DELETE INTERPRETATION

async function deleteInterpretation(id: string) {
    try {
        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            'Interpretation',
            id
        )
        return response;
    } catch (error) {
        console.error('Error Interpreting :', error);
        throw new Error('failed to delete interpret');
    }
}

async function updateInterpretation(id: string, data: { term: string, interpretation: string }) {
    try {
        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            'Interpretation',
            id,
            data
        )
        return response;
    } catch (error) {
        console.error('Error Interpreting :', error);
        throw new Error('failed to delete interpret');
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const interpretation = await fetchInterpretation(id);
        return NextResponse.json({ interpretation })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch interpretation' },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        await deleteInterpretation(id);
        return NextResponse.json({ message: 'Interpretation deleted' })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch interpretation' },
            { status: 500 }
        )
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const interpretation = await req.json();
        await updateInterpretation(id, interpretation);
        return NextResponse.json({message : 'Interpretation Updated'});
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch interpretation' },
            { status: 500 }
        )
    }
}