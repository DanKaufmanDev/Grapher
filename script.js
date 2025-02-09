document.addEventListener('DOMContentLoaded', () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fa-solid fa-plus"></i>';
    button.className = 'squish-button';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.left = '10px';
    button.style.zIndex = '9999';
    button.ariaLabel = 'Add Box';
    document.body.appendChild(button);

    const drawButton = document.createElement('button');
    drawButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
    drawButton.className = 'squish-button';
    drawButton.style.position = 'fixed';
    drawButton.style.top = '10px';
    drawButton.style.left = '70px';
    drawButton.style.zIndex = '9999';
    drawButton.ariaLabel = 'Draw Line';
    document.body.appendChild(drawButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-eraser"></i>';
    deleteButton.className = 'squish-button';
    deleteButton.style.position = 'fixed';
    deleteButton.style.top = '10px';
    deleteButton.style.left = '130px';
    deleteButton.style.zIndex = '9999';
    deleteButton.ariaLabel = 'Erase Line';
    document.body.appendChild(deleteButton);

    const panButton = document.createElement('button');
    panButton.innerHTML = '<i class="fa-solid fa-hand"></i>';
    panButton.className = 'squish-button';
    panButton.style.position = 'fixed';
    panButton.style.top = '10px';
    panButton.style.left = '190px';
    panButton.style.zIndex = '9999';
    panButton.ariaLabel = 'Pan';
    document.body.appendChild(panButton);

    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="fa-solid fa-save"></i>';
    saveButton.className = 'squish-button';
    saveButton.style.position = 'fixed';
    saveButton.style.top = '10px';
    saveButton.style.left = '250px';
    saveButton.style.zIndex = '9999';
    saveButton.ariaLabel = 'Save';
    document.body.appendChild(saveButton);

    const loadButton = document.createElement('button');
    loadButton.innerHTML = '<i class="fa-solid fa-upload"></i>';
    loadButton.className = 'squish-button';
    loadButton.style.position = 'fixed';
    loadButton.style.top = '10px';
    loadButton.style.left = '310px';
    loadButton.style.zIndex = '9999';
    loadButton.ariaLabel = 'Load Save';
    document.body.appendChild(loadButton);

    const nukeButton = document.createElement('button');
    nukeButton.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    nukeButton.className = 'squish-button';
    nukeButton.style.position = 'fixed';
    nukeButton.style.top = '10px';
    nukeButton.style.left = '370px';
    nukeButton.style.zIndex = '9999';
    nukeButton.ariaLabel = 'Clear Screen Warning will delete everything';
    document.body.appendChild(nukeButton);

    nukeButton.addEventListener('click', () => {
        const elements = document.querySelectorAll('.rectangle, .line');
        elements.forEach(element => document.body.removeChild(element));
        saveState();
    });

    const tooltip = document.createElement('div');
    tooltip.style.position = 'fixed';
    tooltip.style.top = '10px';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.padding = '5px 10px';
    tooltip.style.backgroundColor = 'rgb(15, 15, 20';
    tooltip.style.color = 'white';
    tooltip.style.borderRadius = '15px';
    tooltip.style.width = 'auto';
    tooltip.style.height = 'auto';
    tooltip.style.opacity = '1';
    tooltip.style.display = 'none';
    tooltip.style.zIndex = '9999';
    tooltip.style.fontFamily = 'JetBrains Mono, monospace';
    document.body.appendChild(tooltip);

    button.addEventListener('mouseover', () => {
        tooltip.innerText = 'Add';
        tooltip.style.display = 'block';
        tooltip.style.fontSize = '24px';
        tooltip.style.color = 'white';
        tooltip.style.fontFamily = 'JetBrains Mono, monospace';
    });
    button.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });

    drawButton.addEventListener('mouseover', () => {
        tooltip.innerText = 'Draw Line';
        tooltip.style.display = 'block';
        tooltip.style.fontSize = '24px';
        tooltip.style.color = 'white';
        tooltip.style.fontFamily = 'JetBrains Mono, monospace';
    });
    drawButton.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });

    deleteButton.addEventListener('mouseover', () => {
        tooltip.innerText = 'Erase Line';
        tooltip.style.display = 'block';
        tooltip.style.fontSize = '24px';
        tooltip.style.color = 'white';
        tooltip.style.fontFamily = 'JetBrains Mono, monospace';
    });
    deleteButton.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });

    panButton.addEventListener('mouseover', () => {
        tooltip.innerText = 'Pan';
        tooltip.style.display = 'block';
        tooltip.style.fontSize = '24px';
        tooltip.style.color = 'white';  
        tooltip.style.fontFamily = 'JetBrains Mono, monospace';
    });
    panButton.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });

    saveButton.addEventListener('mouseover', () => {
        tooltip.innerText = 'Save';
        tooltip.style.display = 'block';
        tooltip.style.fontSize = '24px';
        tooltip.style.color = 'white';
        tooltip.style.fontFamily = 'JetBrains Mono, monospace';
    });
    saveButton.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });

    loadButton.addEventListener('mouseover', () => {
        tooltip.innerText = 'Load';
        tooltip.style.display = 'block';
        tooltip.style.fontSize = '24px';
        tooltip.style.color = 'white';
        tooltip.style.fontFamily = 'JetBrains Mono, monospace';
    });
    loadButton.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });

    nukeButton.addEventListener('mouseover', () => {
        tooltip.innerText = 'Clear \n (WARNING DELETES EVERYTHING)';
        tooltip.style.display = 'block';
        tooltip.style.fontSize = '24px';
        tooltip.style.color = 'white';
        tooltip.style.textAlign = 'center';
        tooltip.style.fontFamily = 'JetBrains Mono, monospace';
    });
    nukeButton.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });

    button.addEventListener('click', drawRectangle);

    let highestZIndex = 1;
    let isPanning = false;
    let isDrawing = false;
    let isDeleting = false;
    let startX, startY, scrollLeft, scrollTop;
    let lineStart = null;

    function drawRectangle(rectData = null) {
        const rect = document.createElement('div');
        rect.className = 'rectangle';
        rect.style.backgroundColor = 'rgb(45, 45, 55)';
        rect.style.width = '20%';
        rect.style.height = '20%';
        rect.style.borderRadius = '5px';
        rect.style.opacity = '0.5';
        rect.style.border = '1px solid white';
        rect.style.position = 'absolute';
        rect.style.cursor = 'move';
        rect.style.zIndex = highestZIndex;
        rect.style.left = rectData ? rectData.left : '0';
        rect.style.top = rectData ? rectData.top : '0';
        rect.style.width = rectData ? rectData.width : '20%';
        rect.style.height = rectData ? rectData.height : '20%';
        rect.style.fontSize = rectData ? rectData.fontSize : '48px';
        document.body.appendChild(rect);

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        closeButton.id = 'delete-button';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '0';
        closeButton.style.right = '0';
        closeButton.style.cursor = 'pointer';
        rect.appendChild(closeButton);

        closeButton.addEventListener('click', () => {
            if (!isPanning) {
                document.body.removeChild(rect);
                saveState();
            }
        });

        const lockButton = document.createElement('button');
        lockButton.innerHTML = '<i class="fa-solid fa-lock"></i>';
        lockButton.id = 'lock-button';
        lockButton.style.position = 'absolute';
        lockButton.style.top = '0';
        lockButton.style.left = '0';
        lockButton.style.cursor = 'pointer';
        rect.appendChild(lockButton);

        let isLocked = false;

        lockButton.addEventListener('click', () => {
            if (!isPanning) {
                isLocked = !isLocked;
                lockButton.innerHTML = isLocked ? '<i class="fa-solid fa-unlock"></i>' : '<i class="fa-solid fa-lock"></i>';
                rect.style.cursor = isLocked ? 'default' : 'move';
            }
        });

        let isDragging = false;
        let offsetX, offsetY;

        rect.addEventListener('mousedown', (e) => {
            if (!isLocked && !isPanning && e.target !== closeButton && e.target !== lockButton) {
                isDragging = true;
                offsetX = e.clientX - rect.offsetLeft;
                offsetY = e.clientY - rect.offsetTop;
                highestZIndex++;
                rect.style.zIndex = highestZIndex; 
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                rect.style.left = `${(e.clientX - offsetX) / window.innerWidth * 100}%`;
                rect.style.top = `${(e.clientY - offsetY) / window.innerHeight * 100}%`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                saveState();
            }
        });

        // Add resize handle
        const handle = 'bottom-right';
        const div = document.createElement('div');
        div.className = `resize-handle ${handle}`;
        div.style.position = 'absolute';
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.backgroundColor = 'black';
        div.style.opacity = '0.2';
        div.style.borderTopLeftRadius = '25px';
        div.style.border = '2px solid black';
        div.style.cursor = `${handle.replace('-', '')}-resize`;
        rect.appendChild(div);

        const handlePosition = { right: '0', bottom: '0' };
        Object.assign(div.style, handlePosition);

        let isResizing = false;
        let currentHandle;

        // Resize rectangle
        rect.addEventListener('mousedown', (e) => {
            if (!isLocked && !isPanning && e.target.classList.contains('resize-handle')) {
                isResizing = true;
                currentHandle = e.target.classList[1];
                offsetX = e.clientX;
                offsetY = e.clientY;
                highestZIndex++;
                rect.style.zIndex = highestZIndex; // Bring to front and update highest z-index
                rect.style.position = 'absolute';
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isResizing) {
                const dx = e.clientX - offsetX;
                const dy = e.clientY - offsetY;
                const rect_width = rect.offsetWidth;
                const rect_height = rect.offsetHeight;
                const rect_left = rect.offsetLeft;
                const rect_top = rect.offsetTop;
                
                if (currentHandle.includes('right')) {
                    const newWidth = (rect_width + dx) / window.innerWidth * 100;
                    rect.style.width = `${newWidth}%`;  
                }
        
                if (currentHandle.includes('bottom')) {
                    const newHeight = (rect_height + dy) / window.innerHeight * 100;
                    rect.style.height = `${newHeight}%`; 
                }
                offsetX = e.clientX;
                offsetY = e.clientY;
            }
        });

        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                saveState();
            }
        });

        // Add + button to the center of the box
        const addButton = document.createElement('button');
        addButton.innerHTML = '<i class="fa-solid fa-photo-film"></i>';
        addButton.id = 'add-button';
        addButton.style.position = 'absolute';
        addButton.style.top = '50%';
        addButton.style.left = '50%';
        addButton.style.transform = 'translate(-50%, -50%)';
        addButton.style.cursor = 'pointer';
        rect.appendChild(addButton);

        addButton.addEventListener('click', (textData) => {
            if (!isPanning) {
                const content = prompt('Enter Text or Image Address:');
                if (content) {
                    if (content.startsWith('http')) {
                        const img = document.createElement('img');
                        img.src = content;
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        img.draggable = false;
                        rect.appendChild(img);
                    } else {
                        const text = document.createElement('p');
                        text.innerText = content;
                        text.style.fontSize = '48px';
                        text.style.color = 'white';
                        text.style.textAlign = 'center';
                        text.style.margin = '0';
                        text.style.position = 'absolute';
                        text.style.top = '50%';
                        text.style.left = '50%';
                        text.style.transform = 'translate(-50%, -50%)';
                        rect.style.fontSize = rectData ? rectData.fontSize : '48px';
                        rect.appendChild(text);
                    }
                    rect.removeChild(addButton);
                    saveState();
                }
            }
        });

        // Add content to the rectangle
        if (rectData && rectData.content) {
            if (rectData.content.startsWith('http')) {
                const img = document.createElement('img');
                img.src = rectData.content;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.draggable = false;
                rect.appendChild(img);
            } else {
                const text = document.createElement('p');
                text.innerText = rectData.content;
                text.style.color = 'white';
                text.style.textAlign = 'center';
                text.style.margin = '0';
                text.style.position = 'absolute';
                text.style.top = '50%';
                text.style.left = '50%';
                text.style.transform = 'translate(-50%, -50%)';
                rect.appendChild(text);
            }
            rect.removeChild(addButton);
        }
    }
    
    drawButton.addEventListener('click', () => {
        isDrawing = !isDrawing;
        isDeleting = false;
        isPanning = false;
        drawButton.innerHTML = isDrawing ? '<i class="fa-solid fa-ban"></i>' : '<i class="fa-solid fa-pen"></i>';
        deleteButton.innerHTML = '<i class="fa-solid fa-eraser"></i>';
        panButton.innerHTML = '<i class="fa-solid fa-hand"></i>';
        document.body.style.cursor = isDrawing ? 'crosshair' : 'default';
        document.body.classList.toggle('drawing', isDrawing);
        document.body.classList.remove('panning');
    });
    
    deleteButton.addEventListener('click', () => {
        isDeleting = !isDeleting;
        isDrawing = false;
        isPanning = false;
        deleteButton.innerHTML = isDeleting ? '<i class="fa-solid fa-ban"></i>' : '<i class="fa-solid fa-eraser"></i>';
        drawButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
        panButton.innerHTML = '<i class="fa-solid fa-hand"></i>';
        document.body.style.cursor = isDeleting ? 'not-allowed' : 'default';
        document.body.classList.remove('drawing');
        document.body.classList.remove('panning');
    });
    
    panButton.addEventListener('click', () => {
        isPanning = !isPanning;
        isDrawing = false;
        isDeleting = false;
        panButton.innerHTML = isPanning ? '<i class="fa-solid fa-ban"></i>' : '<i class="fa-solid fa-hand"></i>';
        drawButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
        deleteButton.innerHTML = '<i class="fa-solid fa-eraser"></i>';
        document.body.style.cursor = isPanning ? 'grab' : 'default';
        document.body.classList.toggle('panning', isPanning);
    });
    
    document.addEventListener('mousedown', (e) => {
        if (isDrawing) {
            if (!lineStart) {
                lineStart = { x: e.clientX, y: e.clientY };
            } else {
                const lineEnd = { x: e.clientX, y: e.clientY };
                drawLine(lineStart, lineEnd);
                lineStart = null;
                saveState();
            }
        } else if (isPanning) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            scrollLeft = window.scrollX;
            scrollTop = window.scrollY;
            document.body.style.cursor = 'grabbing';
        } else if (isDeleting && e.target.classList.contains('line')) {
            document.body.removeChild(e.target);
            saveState();
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isPanning && isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            window.scrollTo(scrollLeft - dx, scrollTop - dy);
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isPanning) {
            isDragging = false;
            document.body.style.cursor = 'grab';
        }
    });

    function drawLine(start, end, lineData = null) {
        const line = document.createElement('div');
        line.className = 'line';
        line.style.position = 'absolute';
        line.style.backgroundColor = 'white';
        line.style.height = '3px';
        line.style.transformOrigin = '0 0';
        line.style.left = lineData ? lineData.left : `${start.x / window.innerWidth * 100}%`;
        line.style.top = lineData ? lineData.top : `${start.y / window.innerHeight * 100}%`;
        const length = lineData ? lineData.length : Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
        line.style.width = `${length / window.innerWidth * 100}%`;
        const angle = lineData ? lineData.angle : Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
        line.style.transform = `rotate(${angle}deg)`;
        line.style.zIndex = highestZIndex + 1; 
        document.body.appendChild(line);
    }

    saveButton.addEventListener('click', saveState);
    loadButton.addEventListener('click', loadState);

    function saveState() {
        const rectangles = Array.from(document.querySelectorAll('.rectangle')).map(rect => {
            const content = rect.querySelector('img') ? rect.querySelector('img').src : rect.querySelector('p') ? rect.querySelector('p').innerText : null;
            return {
                width: rect.style.width,
                height: rect.style.height,
                left: rect.style.left,
                top: rect.style.top,
                bottom: rect.style.bottom,
                right: rect.style.right,
                fontSize: rect.querySelector('p') ? rect.querySelector('p').style.fontSize : null,
                content: content
            };
        });

        const lines = Array.from(document.querySelectorAll('.line')).map(line => {
            return {
                left: line.style.left,
                top: line.style.top,
                length: parseFloat(line.style.width) * window.innerWidth / 100,
                angle: parseFloat(line.style.transform.replace('rotate(', '').replace('deg)', ''))
            };
        });

        const state = {
            rectangles,
            lines
        };

        localStorage.setItem('graphBoardState', JSON.stringify(state));
    }

    function loadState() {
        const state = JSON.parse(localStorage.getItem('graphBoardState'));
        if (state) {
            state.rectangles.forEach(rectData => drawRectangle(rectData));
            state.lines.forEach(lineData => drawLine(null, null, lineData));
        }
    }

    // Load state on page load
    loadState();
});

// Add CSS styles
const style = document.createElement('style');
style.innerHTML = `
    .rectangle button, .resize-handle {
        display: none;
    }
    .rectangle:hover button, .rectangle:hover .resize-handle {
        display: block;
    }
    body.panning .rectangle button, body.panning .rectangle .resize-handle,
    body.drawing .rectangle button, body.drawing .rectangle .resize-handle {
        display: none !important;
    }
`;

document.head.appendChild(style);