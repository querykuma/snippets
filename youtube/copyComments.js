//TODO: �����˂̐��Ń\�[�g��������
a=$x('//ytd-comment-thread-renderer/ytd-comment-renderer[@id="comment"]//ytd-expander/div');
copy(a.reduce((ac,cv)=>ac+"\n---\n"+cv.innerText,""));
