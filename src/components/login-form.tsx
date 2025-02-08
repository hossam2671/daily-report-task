import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: any;
  errors: any;
}

export function LoginForm({
  onSubmit,
  register,
  errors,
  className,
  ...props
}: LoginFormProps & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 z-50 basis-full sm:basis-1/2 lg:basis-1/3",
        className
      )}
      {...props}
    >
      <Card className="z-50 rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Welcome!</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center ">
          <form className="w-3/4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="enter your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full rounded-xl">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
