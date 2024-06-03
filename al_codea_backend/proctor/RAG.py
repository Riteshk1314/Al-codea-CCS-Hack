from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.llms import Ollama #using an open source model 
llm=Ollama(model="llama2")
from langchain_core.prompts import ChatPromptTemplate
import bs4
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import FAISS


def doc(link):
    loader=WebBaseLoader(web_paths=("{link}",),
                         bs_kwargs=dict(parse_only=bs4.SoupStrainer(
                             class_=("post-title","post-content","post-header")

                     )))

    documents=loader.load()
    documents
    






def ques_maker(link):
    
    doc(link)
    db=FAISS.from_documents(documents[:30],OllamaEmbeddings())

    prompt = ChatPromptTemplate.from_template("""answer the question based on context only
                                        <context>
                                        {context}
                                        </context> 
                                          Question;{input}""")

    document_chain=create_stuff_documents_chain(llm,prompt)
    retriever=db.as_retriever()

    retrieval_chain = create_retrieval_chain(retriever,document_chain)
    response=retrieval_chain.invoke({"input":"create an objective question from the context given. question should have 4 options out of which 1 is correct "})
    ques_ans = response['answer']
    return ques_ans
