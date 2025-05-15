import cohere
import os
from dotenv import load_dotenv

load_dotenv()

co = cohere.Client(os.getenv("COHERE_API_KEY"))


def get_rizz_response(text, sender_pronoun="they", target_pronoun="they"):
    prompt = f"""You're an AI trained in the art of modern flirting, respectful romance, and confidence.

A person who uses the pronoun "{sender_pronoun}" has received the following message from someone they’re interested in — that person uses the pronoun "{target_pronoun}".

Your job is to generate a smooth, charming, and context-aware reply to the message, followed by an explanation of why it works.

Message received: "{text}"

Reply first. Then explain your reasoning, separated by two newlines.
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
