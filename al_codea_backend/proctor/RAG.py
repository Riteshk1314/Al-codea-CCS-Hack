from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.llms import Ollama #using an open source model 

from langchain_core.prompts import ChatPromptTemplate
import bs4
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import FAISS

def ques_maker(link):
    
    loader=WebBaseLoader(web_paths=(f"{link}",))

    documents=loader.load()
    db=FAISS.from_documents(documents[:30],OllamaEmbeddings())
    retriever=db.as_retriever()
    llm=Ollama(model="llama2")
    prompt = ChatPromptTemplate.from_template("""answer the question based on context only
                                        <context>
                                        {context}
                                        </context> 
                                          Question;{input}""")
    document_chain=create_stuff_documents_chain(llm,prompt)
    retrieval_chain = create_retrieval_chain(retriever,document_chain)
    response=retrieval_chain.invoke({"input":"create an objective question from the context given. question should have 4 options out of which 1 is correct "})
    ques_ans = response['answer']
    
    question_start = ques_ans.find("Question:")
    if True:
        question_end = ques_ans.find("\n", question_start)
        question = ques_ans[question_start:question_end].strip()

        answer_start = ques_ans.find("Answer:")
        if answer_start != -1:
            answer_end = ques_ans.find("\n", answer_start)
            answer = ques_ans[answer_start:answer_end].strip()

            resultt = f"{question}\n{answer}"
            return result
    
    return "Failed to extract question and answer from the response."
