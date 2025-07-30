import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { agent } from "../../lib/api/agent";
import { Alert, Button, ButtonGroup, Paper } from "@mui/material";

export default function TestErrors() {
  const [validationError, setValidationError] = useState<string[]>([]);

  const { mutate: fireError } = useMutation({
    mutationFn: async ({ path, method }: { path: string; method: string }) => {
      const url = `${import.meta.env.VITE_API_URL}/${path}`;
      if (method === "POST") await agent.post(url, {});
      else await agent.get(url);
    },
    onError: async (error) => {
      if (Array.isArray(error)) setValidationError(error);
      else setValidationError([]);
    },
  });
  async function handleError(path: string, method = "Get") {
    await fireError({ path, method });
  }
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
      }}
    >
      <ButtonGroup>
        <Button
          variant="contained"
          color="info"
          size="medium"
          onClick={async () => await handleError(`Buggy/notFound`)}
        >
          Not Found
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="medium"
          onClick={async () => await handleError(`Buggy/badRequest`)}
        >
          Bad Request
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          onClick={async () =>
            await handleError(`Activities/CreateActivity`, "POST")
          }
        >
          Validation error
        </Button>
        <Button
          variant="contained"
          color="success"
          size="medium"
          onClick={async () => await handleError(`Buggy/ServerError`, "POST")}
        >
          Method Not Allowed
        </Button>
        <Button
          variant="contained"
          color="error"
          size="medium"
          onClick={async () => await handleError(`Buggy/ServerError`)}
        >
          Server error
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={async () => await handleError(`Buggy/unauthorised`)}
        >
          Unauthorized
        </Button>
      </ButtonGroup>  
      {validationError.map((error,idx)=> <Alert severity="warning" color="warning" key={idx} variant="outlined" sx={{my:1}}>{error}</Alert>)}
    </Paper>
  );
}
