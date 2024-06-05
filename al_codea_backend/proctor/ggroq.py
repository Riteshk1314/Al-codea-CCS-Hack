
import os
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.document_loaders import WebBaseLoader
from langchain.embeddings import OllamaEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
import time
from dotenv import load_dotenv
import bs4
from langchain_groq import ChatGroq
from langchain_community.document_loaders import PyPDFLoader

load_dotenv()
from langchain_community.document_loaders import PyPDFDirectoryLoader
## load the Groq API key
groq_api_key = os.environ['GROQ_API_KEY']

from llama_index.llms.groq import Groq
from dotenv import load_dotenv
import os 
load_dotenv()

from langchain_community.embeddings import HuggingFaceBgeEmbeddings

model_name = "BAAI/bge-base-en"
model_kwargs = {"device": "cpu"}
encode_kwargs = {"normalize_embeddings": True}
hf = HuggingFaceBgeEmbeddings(
    model_name=model_name, model_kwargs=model_kwargs, encode_kwargs=encode_kwargs
)

from bs4 import BeautifulSoup as Soup
from langchain_community.document_loaders.recursive_url_loader import RecursiveUrlLoader
def ques_refined():
    embeddings=hf
    url = "https://www.datacamp.com/cheat-sheet/getting-started-with-python-cheat-sheet"
    loader = RecursiveUrlLoader(
        url=url, max_depth=20, extractor=lambda x: Soup(x, "html.parser").text
    )
    docs = loader.load()

    print('------*')
    text_splitter=RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=250) 
    final_documents=text_splitter.split_documents(docs) 
    vectors=FAISS.from_documents(final_documents,embeddings) 



    llm=ChatGroq(temperature=0, model_name="mixtral-8x7b-32768")


    prompt=ChatPromptTemplate.from_template(
    """
    you are a coding test platform.
    I have give you a context of python documentation. 
    You need to ask questions only on python language  <context>
    {context}
    <context>
    Questions:{input}

    """
    )
    document_chain = create_stuff_documents_chain(llm, prompt)
    retriever = vectors.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, document_chain)


    response=retrieval_chain.invoke({"input":'create 5 random challenging objective type question on python language generate only 3 options out of which only 1 is correct. tell correct option     '})

    print('***********')

    ## load the Groq API key
    groq_api_key = os.environ['GROQ_API_KEY']
    llm = Groq(model="mixtral-8x7b-32768", api_key=groq_api_key)
    from llama_index.core.llms import ChatMessage

    answer=response
    messages = [
        ChatMessage(
            role="system", content="you are an intelligent coding test checker "
        ),
        ChatMessage(role="user", content=f"{answer} check the answers and if the answer is wrong then add none of the above as d) and give it a answer"),
    ]
    xyz = llm.chat(messages)
    print('xyz')
    return xyz