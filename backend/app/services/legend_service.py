import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are a storyteller who crafts urban legends about American towns.
Do not use emojis or slang. Tone should be mysterious, eerie, or serious.
Write in third person. Keep stories between 150-250 words.
Include local flavor based on the city and state provided."""


class LegendService:
    async def generate(self, city: str, state: str) -> str:
        try:
            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": f"Write an urban legend about {city}, {state}."}
                ],
                temperature=0.9,
                max_tokens=400
            )
            return response.choices[0].message.content
        except Exception:
            return f"The legend of {city} remains shrouded in mystery..."


legend_service = LegendService()

