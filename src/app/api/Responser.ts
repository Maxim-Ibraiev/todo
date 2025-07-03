import type { ICard } from "@/interfaces";

enum httpCodes {
  OK = 200,
  CREACTED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

type Data = ICard | ICard[] | null;
export type BackendResponse<T extends Data> = {
  data: T;
  status: string;
  error: Error;
};

class Responser {
  private static base(statusCode: number, data: Data, error?: unknown): Response {
    return new Response(JSON.stringify({ data, error: error || null }), {
      status: statusCode,
      headers: { "content-type": "application/json" },
    });
  }

  static ok(data: Data): Response {
    return this.base(httpCodes.OK, data);
  }

  static created(data: Data): Response {
    return this.base(httpCodes.CREACTED, data);
  }
  static badRequest(error: unknown): Response {
    return this.base(httpCodes.BAD_REQUEST, null, error);
  }
  static notFound(error: unknown): Response {
    return this.base(httpCodes.NOT_FOUND, null, error);
  }
}

export default Responser;
