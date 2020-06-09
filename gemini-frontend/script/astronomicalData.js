(() => {
    let validated = [];

    const dummyBlock = ( size ) => {
        const dummy = document.createElement('div');
        dummy.setAttribute('style', `width: ${size}px; height: ${size}px;`);
        return dummy;
    }

    const onViewPicture = ( astroData ) => {
        astroData.forEach(pic => {
            $(`#viewPicture${pic.image_id}`).on('click', () => {
                window.open(`${pic.image_file}`, '_blank');
            })
        })
    }

    const createPictureElement = ( pic, picSize ) => { 
        const pictureContainer = document.createElement('div');
        const image = document.createElement('img');
        const pictureButton = document.createElement('div');

        pictureContainer.setAttribute('class', 'picture-container');
        image.setAttribute('src', pic.image_file);
        image.setAttribute('width', picSize);
        image.setAttribute('height', picSize);
        image.setAttribute('id', `viewPicture${pic.image_id}`);
        pictureButton.setAttribute('class', 'picture-button');
    
        pictureContainer.appendChild(image);
        pictureContainer.appendChild(pictureButton);

        return pictureContainer;
    }

    const pictureRow = ( ) => {
        const pictureRow = document.createElement('div');
        pictureRow.setAttribute('class', 'modal-picture-row');
        return pictureRow;
    }

    const displayPictureElement = ( elem ) => {
        const reviewPart = document.getElementById('review-part');
        const size = reviewPart.clientWidth;
        const picSize = (size * 28) / 100;
        const pictureContent = document.createElement('div');

        pictureContent.setAttribute('id', 'picture-content');

        var row = pictureRow();
        
        let column = 1, isHasPicture = false;
        elem.astroData.forEach(picture => {
            if(picture.validate.toLowerCase() === 'pass' || picture.validate.toLowerCase() === 'minor'){
                if(column <= 3){
                    row.appendChild( createPictureElement(picture, picSize) );
                    column += 1;
                }
                if(column > 3) {
                    pictureContent.appendChild(row);
                    row = pictureRow();
                    column = 1;
                }
                isHasPicture = true;
            }
        })

        if(!isHasPicture) { document.getElementById('empty-picture').style.display = 'block'; }
        else { document.getElementById('empty-picture').style.display = 'none'; }
        if(column == 3) { row.appendChild( dummyBlock(picSize)); }

        pictureContent.appendChild(row);
        reviewPart.appendChild(pictureContent);

        onViewPicture( elem.astroData );
    }

    const validateSciencePlan = ( elem ) => { 

        displayPictureElement( elem );
        
        if(validated.length <= 0){
            document.getElementById('validated-block').style.display = 'none';
        }
        
        $('#cancel').on('click', () => { 
            $.modal.close(); 
            $('#picture-content').remove();
        })
    }

    const sciencePlanModal = ( elem ) => { 
        $(`#seeMore${elem.planID}`).on('click', () => {
            $('#modal-validate').modal({
                escapeClose: false,
                clickClose: false,
                showClose: false
            });
            let collaList = '', collaboratorList = elem.collaborator;
            if(collaboratorList.length > 0) {
                collaboratorList.forEach(collaborator => {
                    collaList += collaborator.username + ', ';
                })
                collaList = collaList.replace(/,\s*$/, "");
            }else collaList = 'There is no collaboration.';
            var tempStart = elem.startDate.split('T');
            var tempStop  = elem.endDate.split('T');
            var sStart    = tempStart[0].split('-');
            var sStop     = tempStop[0].split('-');
            if(elem.category === 'satellite'){
                document.getElementById('subCategory-block').style.display = 'block';
                document.getElementById('subCategory').innerHTML = elem.subCategory;
            }else document.getElementById('subCategory-block').style.display = 'none';
            document.getElementById('sciencePlanName').innerHTML    = elem.planName;
            document.getElementById('sciencePlanId').innerHTML      = `No. ${elem.planID}`;
            document.getElementById('collaborator').innerHTML       = collaList;
            document.getElementById('creator').innerHTML            = elem.creator;
            document.getElementById('objective').innerHTML          = elem.objectives;
            document.getElementById('fund').innerHTML               = `$ ${elem.fundingInUSD}`;
            document.getElementById('scheduleStart').innerHTML      = sStart[2] + '/' + sStart[1] + '/' + sStart[0];
            document.getElementById('scheduleStop').innerHTML       = sStop[2] + '/' + sStop[1] + '/' + sStop[0];
            document.getElementById('category').innerHTML           = elem.category.charAt(0).toUpperCase() + elem.category.substring(1, elem.category.length);
            document.getElementById('starSystem').innerHTML         = elem.starSystem;
            document.getElementById('telescopeLocation').innerHTML  = elem.telescopeLocation;
            document.getElementById('fileType').innerHTML           = elem.fileType;
            document.getElementById('fileQuality').innerHTML        = elem.fileQuality;
            document.getElementById('colorType').innerHTML          = elem.colorType;
            document.getElementById('color').innerHTML              = elem.colors;
            document.getElementById('contrast').innerHTML           = elem.contrast;
            document.getElementById('brightness').innerHTML         = elem.brightness;
            document.getElementById('saturation').innerHTML         = elem.saturation;
            document.getElementById('comment-content').innerHTML    = (elem.comment === null) ? 'No comment from Science Observer': elem.comment;
            
            validateSciencePlan( elem );
        })
    }

    const viewSciencePlanModal = () => {
        validated.forEach(elem => {
            sciencePlanModal( elem );
        })
    }

    const createValidatedElem = ( elem ) => {
        const validatedContent = document.createElement('div');
        const number = document.createElement('span');
        const title = document.createElement('div');
        const buttonWrapper= document.createElement('div');
        const seeMore = document.createElement('span');
        
        validatedContent.setAttribute('class', 'validated-content');
        validatedContent.setAttribute('id', `validated${elem.planID}`);
        number.setAttribute('class', 'no');
        title.setAttribute('class', 'title');
        buttonWrapper.setAttribute('class', 'validated-button-wrapper');
        seeMore.setAttribute('class', 'seeMore');
        seeMore.setAttribute('id', `seeMore${elem.planID}`);

        number.innerHTML = `No. ${elem.planID}`;
        title.innerHTML = `${elem.planName}`;
        seeMore.innerHTML = 'See more';

        buttonWrapper.appendChild(seeMore);
        validatedContent.appendChild(number);
        validatedContent.appendChild(title);
        validatedContent.appendChild(buttonWrapper);

        return validatedContent;
    }

    const displayValidatedPlan = () => {
        const validatedBlock =  document.getElementById('validated-block');
        const box = document.createElement('div');
        
        box.setAttribute('class', 'validated-box');
        box.setAttribute('id', 'validated-box');

        if( validated.length > 0){
            validatedBlock.setAttribute('class', 'validated-block');
            validated.forEach(elem => {
                const temp = createValidatedElem(elem);
                box.appendChild(temp);
            })
            validatedBlock.appendChild(box);
        }
    }

    const emptyValidated = () => {
        if( validated.length <= 0){
            const empty = document.getElementById('empty-validated-plan');
            empty.setAttribute('class', 'empty-validated-plan');
            empty.innerHTML = 'There is no science plan available here ...';
        }
        if( validated.length < 11){
            document.getElementsByTagName('BODY')[0].style.height = '100vh';
        }
    }

    const backHome = () => {
        $('#go-to-login').html(`<a href="./home.html" id="index"></a>`)
        location.href = $('#index').attr('href');
    }

    const logout = () => {
        $('#go-to-login').html(`<a href="./index.html" id="index"></a>`)
        location.href = $('#index').attr('href');

        localStorage.removeItem('currentUser');
    }

    const setupListeners = () => {
        document.getElementById('logout').addEventListener('click', logout);
        document.getElementById('back-home').addEventListener('click', backHome);
    }

    const run = async () => {
        var currentUser = localStorage.getItem('currentUser');
        currentUser = currentUser ? JSON.parse(currentUser) : {};
        document.getElementById('loginName').innerHTML = currentUser.username; 

        validated = await getSciencePlanByStatus( 'V' );

        setupListeners();
        displayValidatedPlan();
        emptyValidated();
        viewSciencePlanModal();
    }
    run();
})();