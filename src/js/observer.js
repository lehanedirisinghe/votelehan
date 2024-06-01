(function() {
    const ObserverModule = {
        initialize: function() {
            console.log('Observer script loaded');
    
            const initializeObserver = () => {
                console.log('DOM fully loaded and parsed');
    
                if (ObserverModule.observeDomChanges) {
                    ObserverModule.observeDomChanges.disconnect();
                    console.log('Existing observer disconnected');
                    ObserverModule.observeDomChanges = null;
                }
    
                if (!ObserverModule.observeDomChanges) {
                    console.log('Initializing observer for the first time.');
                    ObserverModule.observeDomChanges = new MutationObserver(function(mutationsList, observer) {
                        console.log('DOM changes observed:', mutationsList);
                    });
    
                    const targetNode = document.body;
                    console.log('Target Node:', targetNode);
    
                    if (targetNode instanceof Node) {
                        ObserverModule.observeDomChanges.observe(targetNode, { childList: true, subtree: true });
                        console.log('Observer initialized and observing target node.');
                    } else {
                        console.error('The target node for MutationObserver is not valid.');
                    }
                } else {
                    console.log('Observer already declared');
                }
            };
    
            document.addEventListener("DOMContentLoaded", initializeObserver);
        }
    };
    
    ObserverModule.initialize();
})();
