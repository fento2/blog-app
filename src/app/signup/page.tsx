"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch} from "@/lib/redux/hook";
import axios from "axios";
import { useRef } from "react";
import { login } from "@/lib/redux/features/accountSlice";
import { useRouter } from "next/navigation";

function SignUpPage() {
    const inUsernameRef = useRef<HTMLInputElement>(null);
    const inEmailRef = useRef<HTMLInputElement>(null);
    const inPasswordRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const dispatch = useAppDispatch();

    async function onBtSignUp() {

        try {


            if (inUsernameRef.current?.value === "" ||
                inEmailRef.current?.value === "" ||
                inPasswordRef.current?.value === ""
            ) {
                alert("isi semua");
            } else {

                const response = await axios.post("https://magicalteeth-us.backendless.app/api/data/accounts",
                    {
                        username: inUsernameRef.current?.value,
                        email: inEmailRef.current?.value,
                        password: inPasswordRef.current?.value,

                    }
                );
                console.log(response.data);

                dispatch(
                login({
                    id: response.data.objectId,
                    name: response.data.username,
                    isLogin: true
                }));
                router.push("/");
                


            }
       
        } catch (error) {
            console.log(error);

        }


    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Card>
                <CardContent className="w-96">
                    <h1 className="text-3xl">Signup</h1>
                    <div className="my-4">
                        <label>Username</label>
                        <Input type="text"
                            placeholder="Type username"
                            ref={inUsernameRef} />
                    </div>
                    <div className="my-4">
                        <label>Email</label>
                        <Input type="email"
                            placeholder="Type email"
                            ref={inEmailRef} />
                    </div>
                    <div className="my-4">
                        <label>Password</label>
                        <Input type="password"
                            placeholder="Type passwoord"
                            ref={inPasswordRef} />
                    </div>
                    <Button type="button" className="w-full"
                        onClick={onBtSignUp}>
                        Submit
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}


export default SignUpPage;


