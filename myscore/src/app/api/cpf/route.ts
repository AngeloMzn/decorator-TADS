import getScore from "@/app/domain/action/Score/GetScoreAction";
import { NextResponse } from "next/server";


export async function GET(request: { url: string | URL; }) {
    try {
        const { searchParams } = new URL(request.url);
        const  cpf = searchParams.get('cpf') ;
        if (cpf === null) {
            throw new Error("CPF is required");
        }
        return NextResponse.json(getScore(cpf), { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erro ao processar a solicitação." }, { status: 500 });
    }
}