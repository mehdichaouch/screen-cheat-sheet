$(document).ready(function () {
    var btns = document.querySelectorAll('.btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('mouseover', overTooltip);
        btns[i].addEventListener('mouseleave', clearTooltip);
        btns[i].addEventListener('blur', clearTooltip);
    }

    function overTooltip(e) {
        e.currentTarget.setAttribute('class', 'btn btn-light float-end');
        e.currentTarget.removeAttribute('aria-label');
    }

    function clearTooltip(e) {
        e.currentTarget.setAttribute('class', 'btn btn-dark float-end');
        e.currentTarget.removeAttribute('aria-label');
    }

    function showTooltip(elem, msg) {
        elem.setAttribute('class', 'btn btn-dark float-end tooltipped tooltipped-s');
        elem.setAttribute('aria-label', msg);
    }

    function fallbackMessage(action) {
        var actionMsg = '';
        var actionKey = (action === 'cut' ? 'X' : 'C');
        if (/iPhone|iPad/i.test(navigator.userAgent)) {
            actionMsg = 'No support :(';
        } else if (/Mac/i.test(navigator.userAgent)) {
            actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
        } else {
            actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
        }
        return actionMsg;
    }

    var clipboardSnippets = new ClipboardJS('[data-clipboard-snippet]', {
        target: function (trigger) {
            return trigger.previousElementSibling;
        }
    });
    clipboardSnippets.on('success', function (e) {
        e.clearSelection();
        showTooltip(e.trigger, 'Copied!');
    });
    clipboardSnippets.on('error', function (e) {
        showTooltip(e.trigger, fallbackMessage(e.action));
    });
});
