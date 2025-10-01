import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const authKey = req.headers.get('X-Monitoring-Key');
    if (authKey !== "cQsAuhcLVZKwZLeEdJXSrgK7IgT7o5v1PwzErxbe55s=") {
        return NextResponse.json({ status: "OK" }, { status: 403 })
    }

    return NextResponse.json({ status: 'OK' }, { status: 200 });
}