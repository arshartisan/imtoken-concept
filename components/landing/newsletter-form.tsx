"use client";

import { RiArrowRightLine, RiCheckLine } from "@remixicon/react";
import { useState, type FormEvent } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { InputBase, TextField } from "@/components/base/input/input";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <Form onSubmit={onSubmit} className="w-full min-w-0">
      <TextField name="email" type="email" isRequired aria-label="Email address" isDisabled={done}>
        <InputBase
          dir="ltr"
          // the native input has an intrinsic ~20ch width; let it shrink on phones
          className="w-0"
          placeholder={done ? "You're on the list — thanks!" : "Email address"}
          fieldClassName="h-14 w-full min-w-0 rounded-full ps-5 pe-1.5"
          trailingAddon={
            <Button
              type="submit"
              variant="ghost"
              disabled={done}
              trailingIcon={done ? RiCheckLine : RiArrowRightLine}
              className="h-11 shrink-0 rounded-full px-3 sm:px-4"
            >
              {done ? "Subscribed" : "Subscribe"}
            </Button>
          }
        />
      </TextField>
    </Form>
  );
}
