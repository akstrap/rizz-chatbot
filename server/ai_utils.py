import cohere
import os
from dotenv import load_dotenv

load_dotenv()

co = cohere.Client(os.getenv("COHERE_API_KEY"))


def get_rizz_response(text):
    prompt = f"""You're an intelligent, witty person giving smooth and clever replies to flirty, awkward, or confusing texts.
Message: "{text}"

Reply with an ideal response, then explain why it works, separated by two newlines.
"""

    response = co.chat(
        message=prompt,
        model="command-r-plus",
        temperature=0.8,
    )

    output = response.text.strip()

    if "\n\n" in output:
        reply, explanation = output.split("\n\n", 1)
    else:
        reply, explanation = output, "No explanation provided."

    return reply.strip(), explanation.strip()
