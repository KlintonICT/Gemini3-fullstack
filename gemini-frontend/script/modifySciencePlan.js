(() => {
    let astronomerList = [], collaboratorList = [], category, starSystem, subCategory='', planID = '', creator;
    let planetStarSystem     = ['MERCURY', 'EARTH', 'VENUS', 'MARS', 'JUPITER', 'SATURN', 'URANUS', 'NEPTUNE', 'PLUTO', 'Ceres'],
        cometStarSystem      = ['P9_Tempel_1', 'P19_Borrelly'],
        othersStarSystem     = ['SUN', 'Earth_Moon_Barycenter', 'Nutation', 'Libration', 'Solar_System_Barycenter', 'Comet', 'Asteroid', 'NEO'];
    let satelliteSubcategory = ['Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
    let earthStarSystem      = ['Moon'],
        marsStarSystem       = ['Phobos', 'Deimos'],
        jupiterStarSystem    = ['Io', 'Europa', 'Ganymede', 'Callisto'],
        saturnStarSystem     = ['Mimas', 'Enceladus', 'Tethys', 'Dione', 'Rhea', 'Titan', 'Hyperion', 'Iapetus'],
        uranusStarSystem     = ['Miranda', 'Ariel', 'Umbriel', 'Titania', 'Oberon'],
        neptuneStarSystem    = ['Naiad', 'Thalassa', 'Despina', 'Galatea', 'Larissa', 'Proteus', 'Triton', 'Nereid'],
        plutoStarSystem      = ['Charon']; 

    const selectedCategory = ( categoryValue ) => { 
        switch (categoryValue) {
            case 'planet'   : document.getElementById('subCategory-block').style.display = 'none'; removeSubCategoryElem(); return planetStarSystem; 
            case 'comet'    : document.getElementById('subCategory-block').style.display = 'none'; removeSubCategoryElem(); return cometStarSystem;
            default         : document.getElementById('subCategory-block').style.display = 'none'; removeSubCategoryElem(); return othersStarSystem;
        }
    }

    const selectedsubCategoryOfSatellite = ( starSysValue ) => {
        document.getElementById('subCategory-block').style.display = 'flex';
        switch ( starSysValue ){
            case 'Earth'    : return earthStarSystem;
            case 'Mars'     : return marsStarSystem;
            case 'Jupiter'  : return jupiterStarSystem;
            case 'Saturn'   : return saturnStarSystem;
            case 'Uranus'   : return uranusStarSystem;
            case 'Neptune'  : return neptuneStarSystem;
            case 'Pluto'    : return plutoStarSystem;
        }
    }

    const removeSubCategoryElem = () => {
        var elems = document.getElementById('subCategory');
        elems.innerHTML = '';
    }

    const removeStarSystemElem = () => {
        var elems = document.getElementById('starSystem');
        elems.innerHTML = '';
    }

    const createStarSystemElement = ( starSysValue ) => {
        const elem = document.createElement('option');
        elem.setAttribute('value', starSysValue);
        elem.innerHTML = starSysValue;
        return elem;
    }

    const createSubCategoryElement = ( subCategoryValue ) => {
        const elem = document.createElement('option');
        elem.setAttribute('value', subCategoryValue);
        elem.innerHTML = subCategoryValue;
        return elem;
    }

    const onChangeSubCategory = () => {
        $('#subCategory').on('change', () => {
            removeStarSystemElem();
            const subCategoryContainer = document.getElementById('subCategory');
            const starSystemContainer  = document.getElementById('starSystem');
            subCategory = subCategoryContainer.value;
            selectedsubCategoryOfSatellite( subCategory ).forEach((starSysValue) => {
                starSystemContainer.appendChild( createStarSystemElement(starSysValue) );
            })
            starSystem = starSystemContainer.value;
        });
    }

    const onChangeStarSystem = () => {
        $('#starSystem').on('change', () => {
            const starSystemContainer = document.getElementById('starSystem');
            starSystem = starSystemContainer.value;
        })
    }

    const onChangeCategory = () => {
        $('#category').on('change', () => {
            removeStarSystemElem();
            const starSystemContainer = document.getElementById('starSystem');
            const categoryValue = document.getElementById('category').value;
            category = categoryValue;
            if( categoryValue === 'satellite'){
                displaySubCategory();
            }else{
                selectedCategory( categoryValue ).forEach((starSysValue) => {
                    starSystemContainer.appendChild( createStarSystemElement(starSysValue) );
                })
                starSystem = starSystemContainer.value;
            }
        })
    }

    const displaySubCategory = () => {
        removeSubCategoryElem();
        const subCategoryContainer = document.getElementById('subCategory');
        satelliteSubcategory.forEach(sub => {
            subCategoryContainer.appendChild( createSubCategoryElement( sub ) );
        })
        subCategory = subCategoryContainer.value;
        removeStarSystemElem();
        const starSystemContainer = document.getElementById('starSystem');
        selectedsubCategoryOfSatellite( subCategory ).forEach((starSysValue) => {
            starSystemContainer.appendChild( createStarSystemElement(starSysValue) );
        })
        starSystem = starSystemContainer.value;
    }

    const displayExistingSubCategory = ( subValue ) => {
        removeSubCategoryElem();
        const subCategoryContainer = document.getElementById('subCategory');
        satelliteSubcategory.forEach(sub => {
            subCategoryContainer.appendChild( createSubCategoryElement( sub ) );
        })
        document.getElementById('subCategory').value = subValue;
        subCategory = subCategoryContainer.value;
        removeStarSystemElem();
        const starSystemContainer = document.getElementById('starSystem');
        selectedsubCategoryOfSatellite( subCategory ).forEach((starSysValue) => {
            starSystemContainer.appendChild( createStarSystemElement(starSysValue) );
        })
        starSystem = starSystemContainer.value;
    }

    const displayCategoryChoice = ( categoryValue ) => {
        document.getElementById('category').value = categoryValue; 
        const starSystemContainer = document.getElementById('starSystem');
        category = categoryValue;

        if(categoryValue === 'satellite'){
            displaySubCategory();
        }else{
            selectedCategory( categoryValue ).forEach((starSysValue) => {
                starSystemContainer.appendChild( createStarSystemElement(starSysValue) );
            })
        }

        starSystem = starSystemContainer.value;

        onChangeCategory();
        onChangeStarSystem();
        onChangeSubCategory();
    }

    const activeButton = ( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation ) => {
        const saveBtn = document.getElementById('btn-save');
        if( scienceName && objective && 
            fund && start && stop && 
            fileQual && color && contrast && brightness
            && saturation && !$('#btn-save').hasClass('active')){
            saveBtn.className += ' active';
        }
    } 

    const validateInput = () => {
        const formElem = document.getElementById('science-form');
        const saveBtn = document.getElementById('btn-save');
        let scienceName = false, objective = false, fund = false, start = false, stop = false;
        let fileQual = false, color = false, contrast = false, brightness = false, saturation = false;
        
        if(formElem.scienceName.value.length != 0 && formElem.objective.value.length != 0 &&
            formElem.fund.value.length != 0 && formElem.scheduleStart.value.length != 0 &&
            formElem.fileQuality.value.length !=0 && formElem.color.value.length !=0 &&
            formElem.contrast.value.length !=0 && formElem.brightness.value.length !=0 &&
            formElem.saturation.value.length !=0 && formElem.scheduleStop.value.length != 0){
                scienceName = true, objective = true, fund = true, start = true, stop = true;
                fileQual = true, color = true, contrast = true, brightness = true, saturation = true;
                activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        }
        
        $('#scienceName').on('input', () => {
            if( formElem.scienceName.value.length === 0) { 
                scienceName = false; 
                saveBtn.classList.remove('active');
            } else { scienceName = true }
            activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        })
        $('#objective').on('input', () => {
            if( formElem.objective.value.length === 0) { 
                objective = false; 
                saveBtn.classList.remove('active');
            }else { objective = true; }
            activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        })
        $('#fund').on('input', () => {
            if( formElem.fund.value.length === 0) { 
                fund = false; 
                saveBtn.classList.remove('active');
            } else { fund = true }
            activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        })
        $('#scheduleStart').on('input', () => {
            if( formElem.scheduleStart.value.length === 0) { 
                start = false; 
                saveBtn.classList.remove('active');
            } else { start = true }
            activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        })
        $('#scheduleStop').on('input', () => {
            if( formElem.scheduleStop.value.length === 0) { 
                stop = false; 
                saveBtn.classList.remove('active');
            } else { stop = true }
            activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        })
        $('#fileQuality').on('input', () => {
            if( formElem.fileQuality.value.length === 0 || formElem.fileQuality.value > 100) { 
                fileQual = false; 
                saveBtn.classList.remove('active');
            } else { fileQual = true }
            activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        })
        $('#color').on('input', () => {
            if( formElem.color.value.length === 0 || formElem.color.value > 100) { 
                color = false; 
                saveBtn.classList.remove('active');
            } else { color = true }
            activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        })
        $('#contrast').on('input', () => {
            if( formElem.contrast.value.length === 0 || formElem.contrast.value > 100) { 
                contrast = false; 
                saveBtn.classList.remove('active');
            } else { contrast = true }
            activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        })
        $('#brightness').on('input', () => {
            if( formElem.brightness.value.length === 0 || formElem.brightness.value > 100) { 
                brightness = false; 
                saveBtn.classList.remove('active');
            } else { brightness = true }
            activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        })
        $('#saturation').on('input', () => {
            if( formElem.saturation.value.length === 0 || formElem.saturation.value > 100) { 
                saturation = false; 
                saveBtn.classList.remove('active');
            } else { saturation = true }
            activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        })
        document.getElementById('scheduleStop').setAttribute('min', document.getElementById('scheduleStart').value);
        $('#scheduleStart').on('change', () => {
            document.getElementById('scheduleStop').setAttribute('min', document.getElementById('scheduleStart').value);
            if( document.getElementById('scheduleStop').value < document.getElementById('scheduleStart').value ){
                document.getElementById('scheduleStop').value = document.getElementById('scheduleStart').value;
            }
            stop = true;
            activeButton( scienceName, objective, fund, start, stop, fileQual, color, contrast, brightness, saturation );
        })
    }

    const selectCollabor = () => {
        astronomerList.forEach(ast => {
            $(`#colla${ast.id}`).on('click', () => {
                const elem = document.getElementById(`colla${ast.id}`);
                if(!$(`#colla${ast.id}`).hasClass('active')){
                    collaboratorList.push(ast);
                }else{
                    const findIndex = collaboratorList.findIndex(collaborator => collaborator.id === ast.id);
                    collaboratorList.splice(findIndex, 1);
                }
                elem.classList.toggle('active');
                if(collaboratorList.length <= 0){
                    document.getElementsByClassName('close-modal')[0].style.display = 'block';
                    collaboratorList.splice(0, collaboratorList.length);
                    document.getElementById('collaborate-text').innerHTML = 'Collaborators';
                }else{
                    document.getElementsByClassName('close-modal')[0].style.display = 'none';
                }
            })
        })
    }

    const createAstronomerElem = ( astronomer, id ) => {
        const astElem = document.createElement('span');
        astElem.innerHTML = astronomer;
        astElem.setAttribute('class', 'collaborate-list');
        astElem.setAttribute('id', `colla${id}`);

        return astElem;
    }

    const displayAstronomerList = () => {
        const astronomerElem = document.getElementById('modal-body');   
        astronomerList.forEach(ast => {
            const temp = createAstronomerElem(ast.username, ast.id);
            astronomerElem.appendChild(temp);
        })
    }

    const onSave = async () => {
        const formElem = document.getElementById('science-form');
        let updatedSciencePlan = {}, collaboratorId = [];
        if($('#btn-save').hasClass('active')){

            collaboratorList.forEach(collaborator => {
                collaboratorId.push({id: collaborator.id});
            })

            updatedSciencePlan.planID            = planID;
            updatedSciencePlan.planName          = formElem.scienceName.value;
            updatedSciencePlan.creator           = creator;
            updatedSciencePlan.fundingInUSD      = parseFloat(formElem.fund.value);
            updatedSciencePlan.objectives        = formElem.objective.value;
            var sStart                           = formElem.scheduleStart.value.split('-');
            updatedSciencePlan.startDate         = sStart[2] + '/' + sStart[1] + '/' + sStart[0];
            var sStop                            = formElem.scheduleStop.value.split('-');
            updatedSciencePlan.endDate           = sStop[2] + '/' + sStop[1] + '/' + sStop[0];
            updatedSciencePlan.telescopeLocation = formElem.teleLocated.value;
            updatedSciencePlan.fileType          = formElem.fileType.value;
            updatedSciencePlan.fileQuality       = parseFloat(formElem.fileQuality.value);
            updatedSciencePlan.colorType         = formElem.colorType.value;
            updatedSciencePlan.colors            = parseFloat(formElem.color.value);
            updatedSciencePlan.contrast          = parseFloat(formElem.contrast.value);
            updatedSciencePlan.brightness        = parseFloat(formElem.brightness.value);
            updatedSciencePlan.saturation        = parseFloat(formElem.saturation.value);
            updatedSciencePlan.collaborator      = collaboratorId;
            updatedSciencePlan.starSystem        = starSystem;
            updatedSciencePlan.category          = category;
            if(category === 'satellite') updatedSciencePlan.subCategory = subCategory;

            await updateSciencePlan( updatedSciencePlan );
            
            localStorage.removeItem('modifyPlan');
            
            $('#link-to-menu').html(`<a href="./testSciencePlan.html" id="testSciencePlan"></a>`)
            location.href = $('#testSciencePlan').attr('href');
        }
    }

    const onAddCollaborator = () => {
        let collaList = '';
        if(collaboratorList.length > 0) {
            collaboratorList.forEach(collaborator => {
                collaList += collaborator.username + ', ';
            })
            collaList = collaList.replace(/,\s*$/, "");
            document.getElementById('collaborate-text').innerHTML = collaList;
        }else{
            document.getElementById('collaborate-text').innerHTML = 'Collaborators';
        }
    }

    const onSubmitSciencePlan = ( event ) => { event.preventDefault(); }

    const openModal = () => {
        $("#modal-collaborate").modal({
            escapeClose: false,
            clickClose: false,
        });
        if(collaboratorList.length <= 0){
            document.getElementsByClassName('close-modal')[0].style.display = 'block';
            collaboratorList.splice(0, collaboratorList.length);
            document.getElementById('collaborate-text').innerHTML = 'Collaborators';
        }else{
            document.getElementsByClassName('close-modal')[0].style.display = 'none';
        }
    }

    const displayExistingInfo = () => {
        var modifyPlan = localStorage.getItem('modifyPlan');
        modifyPlan = modifyPlan ? JSON.parse(modifyPlan) : {};
        var sStart = modifyPlan.startDate.split('T');
        var sStop  = modifyPlan.endDate.split('T');
        planID     = modifyPlan.planID;
        creator    = modifyPlan.creator;
        collaboratorList = modifyPlan.collaborator;     
        let collaList = '';
        if(collaboratorList.length > 0) {
            collaboratorList.forEach(collaborator => {
                collaList += collaborator.username + ', ';
                document.getElementById(`colla${collaborator.id}`).classList.toggle('active');
            })
            collaList = collaList.replace(/,\s*$/, "");
            document.getElementById('collaborate-text').innerHTML = collaList;
        }else{
            document.getElementById('collaborate-text').innerHTML = 'Collaborators';
        }

        document.getElementById('science-plan-id').innerHTML = `(No. ${modifyPlan.planID})`;
        document.getElementById('scienceName').value         = modifyPlan.planName;
        document.getElementById('objective').value           = modifyPlan.objectives;
        document.getElementById('fund').value                = modifyPlan.fundingInUSD;
        document.getElementById('scheduleStart').value       = sStart[0];
        document.getElementById('scheduleStop').value        = sStop[0];
        document.getElementById('teleLocated').value         = modifyPlan.telescopeLocation;
        document.getElementById('fileType').value            = modifyPlan.fileType;
        document.getElementById('fileQuality').value         = modifyPlan.fileQuality;
        document.getElementById('colorType').value           = modifyPlan.colorType;
        document.getElementById('color').value               = modifyPlan.colors;
        document.getElementById('contrast').value            = modifyPlan.contrast;
        document.getElementById('brightness').value          = modifyPlan.brightness;
        document.getElementById('saturation').value          = modifyPlan.saturation;
        displayCategoryChoice(modifyPlan.category);
        category = modifyPlan.category;
        if(modifyPlan.category === 'satellite') {
            subCategory = modifyPlan.subCategory;
            displayExistingSubCategory(modifyPlan.subCategory);
        }
        document.getElementById('starSystem').value = modifyPlan.starSystem;
        starSystem = modifyPlan.starSystem;

        validateInput();
    }

    const backHome = () => {
        $('#go-to-login').html(`<a href="./home.html" id="index"></a>`)
        location.href = $('#index').attr('href');
        localStorage.removeItem('modifyPlan');
    }

    const logout = () => {
        $('#go-to-login').html(`<a href="./index.html" id="index"></a>`)
        location.href = $('#index').attr('href');

        localStorage.removeItem('modifyPlan');
        localStorage.removeItem('currentUser');
    }

    const setupListeners = () => {
        $('#science-form').on('submit', onSubmitSciencePlan);
        $('#btn-save').on('click', onSave);
        $('#add-colla-btn').on('click', onAddCollaborator);
        $('#add-collaborate').on('click', openModal);
        document.getElementById('logout').addEventListener('click', logout);
        document.getElementById('back-home').addEventListener('click', backHome);
    }

    const run = async () => {
        var currentUser = localStorage.getItem('currentUser');
        currentUser = currentUser ? JSON.parse(currentUser) : {};
        document.getElementById('loginName').innerHTML = currentUser.username;

        var modifyPlan = localStorage.getItem('modifyPlan');
        modifyPlan = modifyPlan ? JSON.parse(modifyPlan) : {};
        let creatorOfPorject = modifyPlan.creator;

        const allUsers = await getAllUsers();
        allUsers.forEach(user =>{
            if(user.role === 'astronomer' && user.username != creatorOfPorject){
                astronomerList.push({id: user.id, username: user.username});
            }
        })

        document.getElementById('noOthers').style.display = (astronomerList.length <= 0) ? 'block' : 'none';

        setupListeners();
        validateInput();
        displayAstronomerList();
        selectCollabor();
        displayExistingInfo();
    }   
    run();
})();