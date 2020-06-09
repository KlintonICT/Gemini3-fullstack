(() => {
    let executed = [];

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

    const notifyAstronomer = () => {
        $('#modal-notify').modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
        });
        $('#notify-button-no').on('click', () => { $.modal.close(); })
        $('#notify-button-yes').on('click', () => { $.modal.close(); })
    }

    const onValidatePicture =  ( planID, pics ) => { 
        const currentSciencePlanIdx = executed.findIndex(plan => plan.planID === planID);
        
        pics.forEach(pic => {
            $(`#pass${pic.image_id}`).on('click', () => {
                const picIndex = executed[currentSciencePlanIdx].astroData.findIndex(photo => photo.image_id === pic.image_id);
                if($(`#pass${pic.image_id}`).hasClass('active')){
                    document.getElementById(`pass${pic.image_id}`).classList.remove('active');
                    executed[currentSciencePlanIdx].astroData[picIndex].validate = 'Null';
                }else{
                    document.getElementById(`pass${pic.image_id}`).className += ' active';
                    executed[currentSciencePlanIdx].astroData[picIndex].validate = 'Pass';
                }
                if($(`#minor${pic.image_id}`).hasClass('active')){
                    document.getElementById(`minor${pic.image_id}`).classList.remove('active');
                }
                if($(`#major${pic.image_id}`).hasClass('active')){
                    document.getElementById(`major${pic.image_id}`).classList.remove('active');
                }
            })
            $(`#minor${pic.image_id}`).on('click', () => {
                const picIndex = executed[currentSciencePlanIdx].astroData.findIndex(photo => photo.image_id === pic.image_id);
                if($(`#minor${pic.image_id}`).hasClass('active')){
                    document.getElementById(`minor${pic.image_id}`).classList.remove('active');
                    executed[currentSciencePlanIdx].astroData[picIndex].validate = 'Null';
                }else{
                    document.getElementById(`minor${pic.image_id}`).className += ' active';
                    executed[currentSciencePlanIdx].astroData[picIndex].validate = 'Minor';
                }
                if($(`#major${pic.image_id}`).hasClass('active')){
                    document.getElementById(`major${pic.image_id}`).classList.remove('active');
                }if($(`#pass${pic.image_id}`).hasClass('active')){
                    document.getElementById(`pass${pic.image_id}`).classList.remove('active');
                }
            })
            $(`#major${pic.image_id}`).on('click', () => {
                const picIndex = executed[currentSciencePlanIdx].astroData.findIndex(photo => photo.image_id === pic.image_id);
                if($(`#major${pic.image_id}`).hasClass('active')){
                    document.getElementById(`major${pic.image_id}`).classList.remove('active');
                    executed[currentSciencePlanIdx].astroData[picIndex].validate = 'Null';
                }else{
                    document.getElementById(`major${pic.image_id}`).className += ' active';
                    executed[currentSciencePlanIdx].astroData[picIndex].validate = 'Major';
                }
                if($(`#minor${pic.image_id}`).hasClass('active')){
                    document.getElementById(`minor${pic.image_id}`).classList.remove('active');
                }if($(`#pass${pic.image_id}`).hasClass('active')){
                    document.getElementById(`pass${pic.image_id}`).classList.remove('active');
                }
            })
        })
    }

    const createPictureElement = ( pic, picSize ) => { 
        const pictureContainer = document.createElement('div');
        const image = document.createElement('img');
        const pictureButton = document.createElement('div');
        const pass = document.createElement('div');
        const minor = document.createElement('div');
        const major = document.createElement('div');

        pictureContainer.setAttribute('class', 'picture-container');
        image.setAttribute('src', pic.image_file);
        image.setAttribute('width', picSize);
        image.setAttribute('height', picSize);
        image.setAttribute('id', `viewPicture${pic.image_id}`);
        pictureButton.setAttribute('class', 'picture-button');
        pass.setAttribute('class', 'pass');
        minor.setAttribute('class', 'minor');
        major.setAttribute('class', 'major');

        pass.setAttribute('id', `pass${pic.image_id}`);
        minor.setAttribute('id', `minor${pic.image_id}`);
        major.setAttribute('id', `major${pic.image_id}`);

        pass.innerHTML = 'Pass';
        minor.innerHTML = 'Err.Minor';
        major.innerHTML = 'Err.Major';

        pictureButton.appendChild(pass);
        pictureButton.appendChild(minor);
        pictureButton.appendChild(major);

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
        
        let column = 1;
        elem.astroData.forEach(picture => {
            if(column <= 3){
                row.appendChild( createPictureElement(picture, picSize) );
                column += 1;
            }
            if(column > 3) {
                pictureContent.appendChild(row);
                row = pictureRow();
                column = 1;
            }
        })

        if(column == 3) { row.appendChild( dummyBlock(picSize)); }

        pictureContent.appendChild(row);
        reviewPart.appendChild(pictureContent);

        onValidatePicture( elem.planID, elem.astroData );
        onViewPicture( elem.astroData );
    }

    const sendValidatedToAstronomer = async ( validatedInfo ) => {
        await validatedSciencePlan( validatedInfo );
    }

    const onValidateSciencePlan = ( elem ) => {
        $(`#validateBtn${elem.planID}`).on('click', () => {
            $.modal.close();
            $(`#validateBtn${elem.planID}`).remove();
            $(`#executed${elem.planID}`).remove();
            
            var validatedInfo = {};
            var astroDataInfo = [];
            elem.astroData.forEach(astroData =>{ 
                astroDataInfo.push({ id: astroData.image_id, Validate_result: astroData.validate }) 
            })
            validatedInfo.plan_no   = elem.planID;
            validatedInfo.comment   = $(`#comment${elem.planID}`).val() === '' ? null : $(`#comment${elem.planID}`).val();
            validatedInfo.validate = astroDataInfo;
            sendValidatedToAstronomer( validatedInfo );
            
            $(`#comment${elem.planID}`).remove();
            $('#picture-content').remove();
            const executedIndex = executed.findIndex(execut => execut.planID === elem.planID);
            executed.splice(executedIndex, 1);
            if(executed.length <= 0){
                document.getElementById('executed-block').style.display = 'none';
            }
            emptyExecution();
            notifyAstronomer();
        })
        $('#cancel').on('click', () => { 
            $.modal.close(); 
            $(`#validateBtn${elem.planID}`).remove();
            $(`#comment${elem.planID}`).remove();
            $('#picture-content').remove();
        })
    }

    const validateSciencePlan = ( elem ) => { 
        const buttonWrapper = document.getElementById('button-wrapper');
        const commentPart = document.getElementById('comment-part');
        const validateBtn = document.createElement('span');
        const comment = document.createElement('textarea');
        
        validateBtn.setAttribute('class', 'validateSciencePlanBtn');
        validateBtn.setAttribute('id', `validateBtn${elem.planID}`);
        comment.setAttribute('class', 'comment');
        comment.setAttribute('id', `comment${elem.planID}`);
        comment.setAttribute('cols', '30');
        comment.setAttribute('rows', '3');
        
        validateBtn.innerHTML = 'Validate';
        
        buttonWrapper.appendChild(validateBtn);
        commentPart.appendChild(comment);

        displayPictureElement( elem );
        onValidateSciencePlan( elem );
    }

    const sciencePlanModal = ( elem ) => { 
        $(`#next${elem.planID}`).on('click', () => {
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
            
            validateSciencePlan( elem );
        })
    }

    const viewSciencePlanModal = () => {
        executed.forEach(elem => {
            sciencePlanModal( elem );
        })
    }

    const createExecutedElem = ( elem ) => {
        const executedContent = document.createElement('div');
        const number = document.createElement('span');
        const title = document.createElement('div');
        const buttonWrapper= document.createElement('div');
        const next = document.createElement('span');
        
        executedContent.setAttribute('class', 'executed-content');
        executedContent.setAttribute('id', `executed${elem.planID}`);
        number.setAttribute('class', 'no');
        title.setAttribute('class', 'title');
        buttonWrapper.setAttribute('class', 'executed-button-wrapper');
        next.setAttribute('class', 'next');
        next.setAttribute('id', `next${elem.planID}`);

        number.innerHTML = `No. ${elem.planID}`;
        title.innerHTML = `${elem.planName}`;
        next.innerHTML = 'Next>';

        buttonWrapper.appendChild(next);
        executedContent.appendChild(number);
        executedContent.appendChild(title);
        executedContent.appendChild(buttonWrapper);

        return executedContent;
    }

    const displayExecutedPlan = () => {
        const executedBlock =  document.getElementById('executed-block');
        const box = document.createElement('div');
        
        box.setAttribute('class', 'executed-box');
        box.setAttribute('id', 'executed-box');

        if( executed.length > 0){
            executedBlock.setAttribute('class', 'executed-block');
            executed.forEach(elem => {
                const temp = createExecutedElem(elem);
                box.appendChild(temp);
            })
            executedBlock.appendChild(box);
        }
    }

    const emptyExecution = () => {
        if( executed.length <= 0){
            const empty = document.getElementById('empty-executed-plan');
            empty.setAttribute('class', 'empty-executed-plan');
            empty.innerHTML = 'There is no science plan available here ...';
        }
        if( executed.length < 11){
            document.getElementsByTagName('BODY')[0].style.height = '100vh';
        }
    }

    const logout = () => {
        $('#go-to-login').html(`<a href="./index.html" id="index"></a>`)
        location.href = $('#index').attr('href');

        localStorage.removeItem('currentUser');
    }

    const setupListeners = () => {
        document.getElementById('logout').addEventListener('click', logout);
    }

    const run = async () => {
        var currentUser = localStorage.getItem('currentUser');
        currentUser = currentUser ? JSON.parse(currentUser) : {};
        document.getElementById('loginName').innerHTML = currentUser.username; 

        executed = await getSciencePlanByStatus( 'S' );

        setupListeners();
        displayExecutedPlan();
        emptyExecution();
        viewSciencePlanModal();
    }
    run();
})();