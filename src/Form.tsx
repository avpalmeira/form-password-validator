/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import "./global.css";
import {
  ErrorParagraph,
  SuccessParagraph,
  responseFinalMessageCSS,
} from "./styles";
import { FormSchema } from "./types";
import { formSchema } from "./validation";
import { customZodResolver, renderErrors } from "./utils";
import { MIN_LIMIT_PWD, MAX_LIMIT_PWD, VALIDATION_ENDPOINT } from "./constants";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm<FormSchema>({
    resolver: customZodResolver(formSchema),
    mode: "all",
  });
  const [finalMessage, setFinalMessage] = useState({
    msg: "",
    status: "",
  });
  const submitButtonisDisabled = !isValid || isSubmitting;

  const setFailingMessage = (error: any) => {
    setFinalMessage({
      msg: "Falha ao enviar resultado. Tente novamente.",
      status: "error",
    });
    console.error(error);
  };
  const onSuccessSubmit = async (data: FormSchema) => {
    try {
      const response = await fetch(VALIDATION_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setFailingMessage("Failed response");
      }

      const json = await response.json();
      setFinalMessage({
        msg: "Resultado enviado com sucesso!",
        status: "success",
      });
      console.log("Sent data and response", data, json);
    } catch (error) {
      setFailingMessage(error);
    }
  };
  const onErrorSubmit = (error: any) => {
    setFailingMessage(error);
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: "32px" }}>
      <form onSubmit={handleSubmit(onSuccessSubmit, onErrorSubmit)}>
        <Typography variant="h4">Validate your password</Typography>
        <Grid container direction="column" m={0} mb={2}>
          <TextField
            size="small"
            margin="normal"
            placeholder="Nome"
            {...register("name")}
          />
          {errors.name && (
            <ErrorParagraph>{renderErrors(errors.name as any)}</ErrorParagraph>
          )}
          <TextField
            size="small"
            margin="normal"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <ErrorParagraph>{renderErrors(errors.email as any)}</ErrorParagraph>
          )}
          <TextField
            size="small"
            placeholder="Senha"
            margin="normal"
            {...register("password")}
          />
          {isSubmitted && !errors.password && (
            <SuccessParagraph>Senha válida!</SuccessParagraph>
          )}
          {errors.password && (
            <ErrorParagraph>
              <span>Senha inválida</span>
              {renderErrors(errors.password as any)}
            </ErrorParagraph>
          )}
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="baseline">
          {!submitButtonisDisabled && finalMessage.status === "success" && (
            <SuccessParagraph css={responseFinalMessageCSS}>
              {finalMessage.msg}
            </SuccessParagraph>
          )}
          {!submitButtonisDisabled && finalMessage.status === "error" && (
            <ErrorParagraph css={responseFinalMessageCSS}>
              {finalMessage.msg}
            </ErrorParagraph>
          )}
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="info"
              disabled={submitButtonisDisabled}
              type="submit"
              sx={{ width: "100%" }}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
