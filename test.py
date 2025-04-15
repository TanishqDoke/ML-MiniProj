# import re
# import pandas as pd
# import spacy
# import emoji
# from nltk.corpus import stopwords
# import nltk

# # Download NLTK stopwords (run once)
# nltk.download('stopwords')

# # Initialize tools
# nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
# stop_words = set(stopwords.words("english"))

# # Slang dictionary (expand as needed)
# SLANG_DICT = {
#     "u": "you", "r": "are", "wanna": "want to", "gonna": "going to",
#     "shoulda": "should have", "coulda": "could have", "idk": "i do not know",
#     "atm": "at the moment", "irl": "in real life", "smh": "shaking my head"
# }

# def preprocess_text(text):
#     """Full preprocessing pipeline for a single text input"""
#     if not isinstance(text, str):
#         return ""

#     # Step 1: Basic cleaning
#     text = re.sub(r'http\S+|www\S+|@\w+|#\w+', '', text)  # Remove URLs, mentions, hashtags
#     text = re.sub(r'[^\w\s.!?]', '', text)                # Keep only words and basic punctuation

#     # Step 2: Emoji handling
#     text = emoji.demojize(text).replace(":", " ")          # Convert emojis to text

#     # Step 3: Slang/contraction replacement
#     words = []
#     for word in text.split():
#         if word.lower() in SLANG_DICT:
#             words.append(SLANG_DICT[word.lower()])
#         else:
#             words.append(word)
#     text = " ".join(words)

#     # Step 4: Lemmatization and stopword removal
#     doc = nlp(text.lower())
#     lemmatized = []
#     for token in doc:
#         if token.text not in stop_words and len(token.text) > 2:  # Ignore short words
#             lemmatized.append(token.lemma_)
#     text = " ".join(lemmatized)

#     # Step 5: Final cleanup
#     text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces

#     return text

# def extract_features(df):
#     """Add engineered features to the DataFrame"""
#     # Punctuation counts
#     df['exclamation_count'] = df['text'].apply(lambda x: str(x).count('!'))
#     df['question_count'] = df['text'].apply(lambda x: str(x).count('?'))

#     # Text length features
#     df['word_count'] = df['text'].apply(lambda x: len(str(x).split()))
#     df['char_count'] = df['text'].apply(lambda x: len(str(x)))

#     return df

# # --- MAIN PROCESSING PIPELINE ---
# def full_preprocessing(input_file, output_file):
#     # Load data
#     df = pd.read_csv(input_file)

#     # Apply text preprocessing
#     df['cleaned_text'] = df['text'].apply(preprocess_text)

#     # Feature engineering
#     df = extract_features(df)

#     # Save processed data
#     df.to_csv(output_file, index=False)
#     print(f"Processed data saved to {output_file}")
#     return df

# # Example usage
# if __name__ == "__main__":
#     input_csv = "sentiment140_cleaned.csv"  # Replace with your input file
#     output_csv = "processed_tweets.csv"
#     processed_df = full_preprocessing(input_csv, output_csv)

#     # Show sample output
#     print("\nSample processed data:")
#     print(processed_df[['text', 'cleaned_text', 'exclamation_count']].head())


import re
import pandas as pd
import spacy
import emoji
from nltk.corpus import stopwords
import nltk

# Download NLTK stopwords (run once)
try:
    stop_words = set(stopwords.words("english"))
except LookupError:
    nltk.download('stopwords')
    stop_words = set(stopwords.words("english"))

# Initialize Spacy model
nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])

# Slang dictionary (can be expanded or loaded from JSON)
SLANG_DICT = {
    "u": "you", "r": "are", "wanna": "want to", "gonna": "going to",
    "shoulda": "should have", "coulda": "could have", "idk": "i do not know",
    "atm": "at the moment", "irl": "in real life", "smh": "shaking my head"
}

def preprocess_text(text):
    """Full preprocessing pipeline for a single text input"""
    if not isinstance(text, str):
        return ""

    # Basic cleaning
    text = re.sub(r'http\S+|www\S+|@\w+|#\w+', '', text)  # Remove URLs, mentions, hashtags
    text = re.sub(r'[^\w\s.!?\'-]', '', text)             # Keep words and basic punctuation

    # Emoji handling
    text = emoji.demojize(text).replace(":", " ")

    # Slang/contraction replacement
    words = [SLANG_DICT.get(word.lower(), word) for word in text.split()]
    text = " ".join(words)

    # Lemmatization and stopword removal
    doc = nlp(text.lower())
    lemmatized = [token.lemma_ for token in doc if token.text not in stop_words]
    text = " ".join(lemmatized)

    # Final cleanup
    return re.sub(r'\s+', ' ', text).strip()

def extract_features(df):
    """Add engineered features to the DataFrame"""
    df['exclamation_count'] = df['text'].str.count('!')
    df['question_count'] = df['text'].str.count('?')
    df['word_count'] = df['text'].str.split().str.len()
    df['char_count'] = df['text'].str.len()
    return df

def full_preprocessing(input_file, output_file):
    # Load data
    df = pd.read_csv(input_file)

    if 'text' not in df.columns:
        raise ValueError("The input file must contain a 'text' column.")

    df['text'] = df['text'].fillna("")  # Handle missing values

    # Apply text preprocessing
    df['cleaned_text'] = df['text'].apply(preprocess_text)

    # Feature engineering
    df = extract_features(df)

    # Save processed data
    df.to_csv(output_file, index=False)
    print(f"Processed data saved to {output_file}")
    return df