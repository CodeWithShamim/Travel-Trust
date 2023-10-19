import { NextResponse } from "next/server";

const middleware = () => {
  return NextResponse.next();
};

export default middleware;
