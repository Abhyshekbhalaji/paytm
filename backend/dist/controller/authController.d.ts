import { type Request, type Response } from 'express';
export declare const signUpController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const signInController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const validateUser: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authController.d.ts.map