from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.llms import Ollama #using an open source model 
from langchain_core.prompts import ChatPromptTemplate
import bs4
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import FAISS

from django.shortcuts import render
from .RAG import ques_maker

def ques_proc(request):
    if request.method == 'POST':
        link = request.POST.get('link') 
        qna = ques_maker(link)
        context = {'qna': qna}
        return render(request, 'proctor/question.html', context)
    return render(request, 'proctor/question.html')
    
