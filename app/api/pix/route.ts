import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, amount } = body;

    if (!name || !email || !phone || !amount) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const publicKey = process.env.BLACKPAY_PUBLIC_KEY;
    const secretKey = process.env.BLACKPAY_SECRET_KEY;

    if (!publicKey || !secretKey) {
      console.error("Chaves de autenticação ausentes");
      return NextResponse.json({ error: "Erro de autenticação" }, { status: 500 });
    }

    const auth = 'Basic ' + Buffer.from(`${publicKey}:${secretKey}`).toString('base64');

    // ✅ Conversão para centavos (inteiro)
    const parsedAmount = Math.round(Number(amount) * 100);

   const payload = {
   amount: parsedAmount,
   paymentMethod: 'pix',
   customer: {
    name,
    email,
    phone,
  },
   items: [
    {
      title: 'Produto Genérico',
      quantity: 1,
      unitPrice: parsedAmount,
      tangible: false,
     },
     ],
      };


    // ✅ Log do payload enviado
    console.log("Payload enviado:", JSON.stringify(payload, null, 2));

    const response = await fetch("https://api.blackpayments.pro/v1/transactions", {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

        const data = await response.json();
       console.log("Resposta da API:", data);

    
    if (!response.ok) {
      console.error("Erro da API (detalhado):", JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: data.message || "Erro ao gerar Pix" },
        { status: response.status }
      );
    }

    return NextResponse.json({
    id: data.id,
    amount: data.amount,
    qrcode: data.pix.qrcode,  // aqui o QR code para Pix
    expirationDate: data.pix.expirationDate, // se quiser mostrar validade
    });

  } catch (error) {
    console.error("Erro na requisição:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
