// Get project ID from URL parameters
function getProjectId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load project data
async function loadProjectData() {
    const projectId = getProjectId();
    
    if (!projectId) {
        showError();
        return;
    }

    try {
        // Load the JSON file
        const response = await fetch('projects-data.json');
        const data = await response.json();
        
        // Find the specific project
        const project = data.projects.find(p => p.id === projectId);
        
        if (!project) {
            showError();
            return;
        }
        
        // Display project details
        displayProject(project);
    } catch (error) {
        console.error('Error loading project data:', error);
        showError();
    }
}

// Display project details
function displayProject(project) {
    // Hide loading, show content
    document.getElementById('loading').style.display = 'none';
    document.getElementById('project-content').style.display = 'block';
    
    // Update page title
    document.title = `${project.title} - Bánh Vĩnh Thuận`;
    
    // Project Header
    document.getElementById('project-type').textContent = project.projectType;
    document.getElementById('project-duration').textContent = project.duration;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('course-name').textContent = project.courseName;
    document.getElementById('role').textContent = project.role;
    
    // Problem & Objective
    document.getElementById('problem').textContent = project.problem;
    document.getElementById('objective').textContent = project.objective;
    
    // Key Features
    const featuresList = document.getElementById('key-features');
    featuresList.innerHTML = '';
    project.keyFeatures.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Tech Stack - Updated to handle dynamic keys
    const techStackGrid = document.getElementById('tech-stack');
    techStackGrid.innerHTML = '';
    
    // Icon mapping for different tech categories
    const iconMapping = {
        'frontend': 'fa-desktop',
        'backend': 'fa-server',
        'database': 'fa-database',
        'ai': 'fa-robot',
        'platform': 'fa-cloud',
        'environment': 'fa-laptop-code',
        'programmingLanguage': 'fa-code',
        'bigDataFramework': 'fa-database',
        'dataProcessing': 'fa-cogs',
        'machineLearning': 'fa-brain',
        'dataAnalysis': 'fa-chart-line',
        'dataStorage': 'fa-hdd',
        'visualization': 'fa-chart-bar',
        'realTime': 'fa-bolt',
        'dataStorage': 'fa-save'
    };
    
    // Label mapping for better display names
    const labelMapping = {
        'frontend': 'Frontend',
        'backend': 'Backend',
        'database': 'Database',
        'ai': 'AI/Tools',
        'platform': 'Platform',
        'environment': 'Environment',
        'programmingLanguage': 'Programming Language',
        'bigDataFramework': 'Big Data Framework',
        'dataProcessing': 'Data Processing',
        'machineLearning': 'Machine Learning',
        'dataAnalysis': 'Data Analysis',
        'dataStorage': 'Data Storage',
        'realTime': 'Real-time Communication'
    };
    
    // Process all tech stack categories dynamically
    if (project.techStack) {
        Object.keys(project.techStack).forEach(key => {
            const techData = project.techStack[key];
            
            // Only process if the category has data
            if (techData && Array.isArray(techData) && techData.length > 0) {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'tech-category';
                
                const icon = iconMapping[key] || 'fa-cube';
                const label = labelMapping[key] || key.charAt(0).toUpperCase() + key.slice(1);
                
                const categoryTitle = document.createElement('h3');
                categoryTitle.innerHTML = `<i class="fas ${icon}"></i> ${label}`;
                categoryDiv.appendChild(categoryTitle);
                
                const techItems = document.createElement('div');
                techItems.className = 'tech-items';
                
                techData.forEach(tech => {
                    const techTag = document.createElement('span');
                    techTag.className = 'tech-tag';
                    techTag.textContent = tech;
                    techItems.appendChild(techTag);
                });
                
                categoryDiv.appendChild(techItems);
                techStackGrid.appendChild(categoryDiv);
            }
        });
    }
    
    // Results
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = '';
    project.results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        resultsList.appendChild(li);
    });
    
    // Project Images with dynamic sizing
    const imagesSection = document.getElementById('images-section');
    const projectGallery = document.getElementById('project-images');
    projectGallery.innerHTML = '';
    
    if (project.images && project.images.length > 0) {
        imagesSection.style.display = 'block';
        
        // Apply appropriate class based on number of images
        if (project.images.length === 1) {
            projectGallery.className = 'project-gallery single-image';
        } else if (project.images.length === 2) {
            projectGallery.className = 'project-gallery two-images';
        } else {
            projectGallery.className = 'project-gallery multiple-images';
        }
        
        project.images.forEach(imageSrc => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = project.title;
            img.loading = 'lazy';
            
            galleryItem.appendChild(img);
            projectGallery.appendChild(galleryItem);
        });
    } else {
        imagesSection.style.display = 'none';
    }
    
    // Demo Video
    const videoSection = document.getElementById('video-section');
    const demoVideo = document.getElementById('demo-video');
    
    if (project.demoVideo && project.demoVideo.trim() !== '') {
        videoSection.style.display = 'block';
        demoVideo.src = project.demoVideo;
    } else {
        videoSection.style.display = 'none';
    }
    
    // Project Links
    const githubLink = document.getElementById('github-link');
    const liveDemo = document.getElementById('live-demo');
    
    if (project.githubLink && project.githubLink.trim() !== '') {
        githubLink.href = project.githubLink;
        githubLink.style.display = 'inline-flex';
    } else {
        githubLink.style.display = 'none';
    }
    
    if (project.liveDemo && project.liveDemo.trim() !== '') {
        liveDemo.href = project.liveDemo;
        liveDemo.style.display = 'inline-flex';
    } else {
        liveDemo.style.display = 'none';
    }
}

// Show error state
function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadProjectData);