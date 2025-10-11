import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const authKey = req.headers.get('X-Monitoring-Key');
	if (authKey !== process.env.HEALTH_CHECK_API_KEY) {
		return NextResponse.json({ status: 'unauthorized' }, { status: 403 });
	}

	return NextResponse.json({ status: 'OK' }, { status: 200 });
}
