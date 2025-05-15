import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")


def get_rizz_response(text):
    prompt = f"Message: {text}\n\nReply as if you're an intelligent, witty person trying to impress or charm someone. Also explain the reasoning behind your reply."
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.8,
    )
    full_response = response["choices"][0]["message"]["content"]
    if "\n\n" in full_response:
        reply, explanation = full_response.split("\n\n", 1)
    else:
        reply, explanation = full_response, "No explanation provided."
    return reply.strip(), explanation.strip()
