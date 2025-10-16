

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
     const [data, setData] = useState<{
       name: string;
       email: string;
       password: string;
     }>({ name: "", email: "", password: "" });
     console.log(data);

     async function sendData() {
       const newUser = await addNewUser(data);
       console.log(newUser);
     }

     return (
       <div className="absolute top-[50%] left-[50%] transform -translate-[50%] w-100">
         <Card className="w-full max-w-sm">
           <CardHeader>
             <CardTitle>Sign In to your account</CardTitle>
             <CardDescription>
               Enter your email below to Sign In to your account
             </CardDescription>
             <CardAction>
               <Link href="/LoginPage">
                 <Button variant="link">Log In</Button>
               </Link>
             </CardAction>
           </CardHeader>
           <CardContent>
             <form>
               <div className="flex flex-col gap-6">
                 <div className="grid gap-2">
                   <Label htmlFor="email">Username</Label>
                   <Input
                     id="text"
                     type="text"
                     placeholder="ashutosh"
                     value={data.name}
                     onChange={(e) =>
                       setData((prev) => ({ ...prev, name: e.target.value }))
                     }
                     required
                   />
                   <Label htmlFor="email">Email</Label>
                   <Input
                     id="email"
                     type="email"
                     placeholder="m@example.com"
                     value={data.email}
                     onChange={(e) =>
                       setData((prev) => ({ ...prev, email: e.target.value }))
                     }
                     required
                   />
                 </div>
                 <div className="grid gap-2">
                   <div className="flex items-center">
                     <Label htmlFor="password">Password</Label>
                   </div>
                   <Input
                     id="password"
                     type="password"
                     required
                     onChange={(e) =>
                       setData((prev) => ({
                         ...prev,
                         password: e.target.value,
                       }))
                     }
                   />
                 </div>
               </div>
             </form>
           </CardContent>
           <CardFooter className="flex-col gap-2">
             <Button type="submit" className="w-full" onClick={sendData}>
               Sign In
             </Button>
           </CardFooter>
         </Card>
       </div>
     );
}
