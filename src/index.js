import {extend, isObject, isString} from 'changlin-util'

export async function chooseImagemin(option) {
    const defaultOption = {
        quality: .7,
        width: void(0),
        height: void(0),
        url: void(0)
    }
    if (isObject(option)) {
        extend(defaultOption, option)
    }
    if (isString(defaultOption.url)) {
        const r= await toDataURL(defaultOption.url, defaultOption)
        return [
            {
                result:r,
                name:Date.now(),
                type:/image\/[a-z]+/.exec(r)[0]
            }
        ]
    } else {
        const files = await chooseImage(),
            result=[];
        for(let i=0;i<files.length;i++){
            const f=await readFileAsDataURL(files[i]);
            const r=await toDataURL(f,extend({type:files[i].type},defaultOption))
            result.push(
                {
                    result:r,
                    name:files[i].name,
                    type:files[i].type
                }
            )
        }

        return result
    }
}

function chooseImage() {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('multiple', 'multiple');
        input.setAttribute('accept', 'image/png,image/jpeg,image/gif,image/jpg');
        input.addEventListener(
            'change',
            function () {
                let files = [...this.files];
                files = files.filter(f => /\.(jpg|jpeg|gif|png)$/i.test(f.name));
                resolve(files)
            },
            false);
        input.click();
    })
}



function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
            resolve(this.result)
        }
        reader.onerror=function(e){
            reject(e)
        }
        reader.readAsDataURL(file);
    })
}


function toDataURL(path, option) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function () {
            let w = img.width,
                h = img.height,
                scale = w / h;
            w = option.width || w;
            h = option.height || (w / scale);
            const quality = option.quality || 0.7;  // 默认图片质量为0.7
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const anw = document.createAttribute("width"),
                anh = document.createAttribute("height");
            anw.nodeValue = w;
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL(option.type, quality))
        }
        img.onerror = function (e) {
            reject(e)
        }
        img.src = path;
    })
}

