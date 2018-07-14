from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def get_content():
    return {
        'chats':[
            (1,'Hi'),
            (2,'通知職務：新北區-兼職送餐外務\n\
104快遞 新竹營運中心，正在招募【兼職外地-時段彈性】，\n\
透過104人力銀行看到您的資料，並對您的資歷很有興趣。\n\
先將我們的求才資料Email給您參考。\n\
若您對我們的工作機會有興趣，歡迎與我們聯絡。謝謝您!\n\
面試地點：新北市新店區寶中路119號\n\
聯絡窗口：壹先生\n\
聯絡電話：02-2912-6104','香山火車站'),
            (0,'好的，謝謝')],
        'home':'國立清華大學',
    }

def chats(request):
    return render(request, 'maps/chats.html', get_content())

def maps(request):
    content = {
        'company':request.GET.get('company', '新北市新店區寶中路119'),
        'home':request.GET.get('home','國立政治大學'),
    }
    return render(request, 'maps/maps.html', content)
    
def chats_with_maps(request):
    return render(request, 'maps/chats-with-maps.html', get_content())