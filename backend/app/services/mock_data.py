MOCK_PLACES = {
    "10001": {
        "hotels": [
            {"name": "The Manhattan Club", "address": "200 W 56th St"},
            {"name": "Hotel Penn", "address": "401 7th Ave"},
            {"name": "The New Yorker Hotel", "address": "481 8th Ave"},
        ],
        "restaurants": [
            {"name": "Katz's Delicatessen", "address": "205 E Houston St"},
            {"name": "Joe's Pizza", "address": "7 Carmine St"},
            {"name": "The Smith", "address": "956 2nd Ave"},
        ],
        "activities": [
            {"name": "Empire State Building", "description": "Iconic 102-story skyscraper"},
            {"name": "Times Square", "description": "Bustling commercial intersection"},
            {"name": "Central Park", "description": "843-acre urban park"},
        ],
        "legend": {
            "title": "The Ghost of the Empire State",
            "story": "They say on foggy nights, the silhouette of a woman appears on the 86th floor observation deck. Legend has it she's searching for her lost love who promised to meet her there in 1945 but never returned from the war."
        }
    },
    "90210": {
        "hotels": [
            {"name": "The Beverly Hills Hotel", "address": "9641 Sunset Blvd"},
            {"name": "Waldorf Astoria", "address": "9850 Wilshire Blvd"},
            {"name": "The Peninsula", "address": "9882 S Santa Monica Blvd"},
        ],
        "restaurants": [
            {"name": "Spago", "address": "176 N Canon Dr"},
            {"name": "The Ivy", "address": "113 N Robertson Blvd"},
            {"name": "Mastro's Steakhouse", "address": "246 N Canon Dr"},
        ],
        "activities": [
            {"name": "Rodeo Drive", "description": "Luxury shopping district"},
            {"name": "Greystone Mansion", "description": "Historic Tudor estate"},
            {"name": "Beverly Gardens Park", "description": "1.9-mile linear park"},
        ],
        "legend": {
            "title": "The Curse of Rodeo Drive",
            "story": "Local shopkeepers whisper about a mysterious woman in vintage Chanel who appears at closing time. She browses but never buys, leaving behind the faint scent of jasmine. They say she's the ghost of a starlet who lost everything in the 1929 crash."
        }
    },
}

def get_mock_data(zip_code: str) -> dict:
    if zip_code in MOCK_PLACES:
        return MOCK_PLACES[zip_code]
    return {"hotels": [], "restaurants": [], "activities": [], "legend": None}

