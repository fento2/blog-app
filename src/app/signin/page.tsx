"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/lib/redux/hook";
import { login } from "@/lib/redux/features/accountSlice";
import axios from "axios";
import { useRef } from "react";
import { useRouter } from "next/navigation";

interface IUser {
    objectId: string;
    email: string;
    password: string;
    username: string;
}

function SignInPage() {
    const inEmailRef = useRef<HTMLInputElement>(null);
    const inPasswordRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();
    const router = useRouter();

    async function onBtSignIn() {
        try {
            if (
                inEmailRef.current?.value === "" ||
                inPasswordRef.current?.value === ""
            ) {
                alert("Isi semua data");
                return;
            }


            const response = await axios.get("https://magicalteeth-us.backendless.app/api/data/accounts");

            const foundUser = response.data.find(
                (props: IUser) => {
                    return (
                        props.email === inEmailRef.current?.value &&
                        props.password === inPasswordRef.current?.value
                    );
                }
            );

            if (foundUser) {
                dispatch(
                    login({
                        id: foundUser.objectId,
                        name: foundUser.username,
                        isLogin: true
                    })
                );
                router.push("/");

            } else {
                alert("Email atau password salah!");
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Card>
                <CardContent className="w-96">
                    <h1 className="text-3xl mb-4">Sign In</h1>

                    <div className="mb-4">
                        <label>Email</label>
                        <Input
                            type="email"
                            placeholder="Type your email"
                            ref={inEmailRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label>Password</label>
                        <Input
                            type="password"
                            placeholder="Type your password"
                            ref={inPasswordRef}
                        />
                    </div>

                    <Button className="w-full" onClick={onBtSignIn}>
                        Sign In
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default SignInPage;
