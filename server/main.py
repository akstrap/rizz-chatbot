from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from ocr_utils import extract_text_from_image
from ai_utils import get_rizz_response

app = FastAPI()

# Enable CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/rizzbot")
async def rizzbot_endpoint(
    message: str = Form(None),
    file: UploadFile = File(None)
):
    if file:
        contents = await file.read()
        text = extract_text_from_image(contents)
    else:
        text = message

    reply, explanation = get_rizz_response(text)
    return {"reply": reply, "explanation": explanation}
