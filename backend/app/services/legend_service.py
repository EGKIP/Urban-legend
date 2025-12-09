import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are a poet who writes short, haunting verses about American towns.
Do not use emojis or slang. Tone: mysterious, eerie, atmospheric.
Write a poem of 3-4 short stanzas (4 lines each).
Include local references to the city.
Do not include a title. End with a blank line then: — Urban Legend AI"""


class LegendService:
    async def generate(self, city: str, state: str) -> str:
        try:
            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": f"Write a haunting poem about the legends of {city}, {state}."}
                ],
                temperature=0.9,
                max_tokens=300
            )
            return response.choices[0].message.content
        except Exception:
            return f"In {city}'s shadow, secrets sleep...\n\n— Urban Legend AI"


legend_service = LegendService()

