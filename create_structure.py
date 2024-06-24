import os

structure = {
    'src/routes': [
        'index.svelte',
        'policy/+page.svelte',
        'economy/+page.svelte',
        'social/+page.svelte',
        'story/+page.svelte',
        'terms/+page.svelte',
        'policy/defense.svelte',
        'policy/finance.svelte',
        'policy/foreign.svelte',
        'policy/home.svelte',
        'policy/law.svelte',
        'policy/pm.svelte',
        'policy/president.svelte',
        'policy/speaker.svelte',
        'social/buddhist.svelte',
        'social/education.svelte',
        'social/food.svelte',
        'social/fun.svelte',
        'social/health.svelte',
        'social/media.svelte',
        'social/po.svelte',
        'social/women.svelte',
        'story/history.svelte',
        'story/lehan.svelte',
        'story/map.svelte',
        'story/military.svelte',
        'story/mnc.svelte',
        'story/standards.svelte',
        'story/wealth.svelte',
        'story/world.svelte'
    ]
}

def create_files(base, files):
    for file in files:
        file_path = os.path.join(base, file)
        dir = os.path.dirname(file_path)
        os.makedirs(dir, exist_ok=True)
        with open(file_path, 'w') as f:
            content = (
                '<script>\n// Your script if needed\n</script>\n\n'
                f'<h1>{os.path.basename(file).replace(".svelte", "").replace("-", " ").capitalize()} Page</h1>\n'
                f'<p>Details about {os.path.basename(file).replace(".svelte", "").replace("-", " ").capitalize()}.</p>\n\n'
                '<style>\n  /* Add your styles here */\n</style>'
            )
            f.write(content)

for base, files in structure.items():
    create_files(base, files)

print('Structure created successfully!')
