/**
 * SEUP Notification Bell - Žuto kričavo zvono
 * (c) 2025 8Core Association
 */

(function() {
    'use strict';

    // Initialize notification bell
    function initNotificationBell() {
        const bell = document.getElementById('seupNotificationBell');
        const badge = document.getElementById('notificationCount');

        if (!bell || !badge) {
            console.warn('Notification bell elements not found');
            return;
        }

        // Test: Postavi broj notifikacija (ovo će kasnije biti iz baze)
        const testNotificationCount = 3;
        updateNotificationCount(testNotificationCount);

        // Click event
        bell.addEventListener('click', function() {
            handleBellClick();
        });

        // Load notifications from server (placeholder)
        loadNotifications();
    }

    // Update notification count
    function updateNotificationCount(count) {
        const badge = document.getElementById('notificationCount');
        const bell = document.getElementById('seupNotificationBell');

        if (!badge || !bell) return;

        if (count > 0) {
            badge.textContent = count > 99 ? '99+' : count;
            badge.style.display = 'flex';
            badge.setAttribute('data-count', count);
            bell.classList.add('has-notifications');
        } else {
            badge.textContent = '0';
            badge.style.display = 'none';
            badge.setAttribute('data-count', '0');
            bell.classList.remove('has-notifications');
        }
    }

    // Handle bell click
    function handleBellClick() {
        console.log('Bell clicked! Opening notifications...');

        // Trigger ring animation
        const bellIcon = document.querySelector('.bell-icon');
        if (bellIcon) {
            bellIcon.style.animation = 'none';
            setTimeout(() => {
                bellIcon.style.animation = 'bellRing 0.5s ease-in-out';
            }, 10);
        }

        // TODO: Ovdje će se otvoriti dropdown panel s obavijestima
        showNotificationPanel();
    }

    // Show notification panel (placeholder)
    function showNotificationPanel() {
        // Privremeno - alert, kasnije će biti custom panel
        const count = document.getElementById('notificationCount').textContent;
        alert('Notification Panel\n\nImate ' + count + ' novih obavijesti!\n\n(Panel u razvoju...)');
    }

    // Load notifications from server
    function loadNotifications() {
        // TODO: AJAX call to fetch notifications
        // Za sada koristimo test podatke

        // Simulacija učitavanja
        setTimeout(() => {
            const mockNotifications = [
                {
                    id: 1,
                    title: 'Novi predmet zaprimljen',
                    message: 'Predmet #2025-001 je zaprimljen',
                    timestamp: '2025-11-27 10:30:00',
                    type: 'predmet',
                    read: false
                },
                {
                    id: 2,
                    title: 'Dokument zahtijeva potpis',
                    message: 'Dokument AKT-123 čeka vaš potpis',
                    timestamp: '2025-11-27 09:15:00',
                    type: 'akt',
                    read: false
                },
                {
                    id: 3,
                    title: 'Novi komentar',
                    message: 'Novi komentar na predmetu #2025-045',
                    timestamp: '2025-11-27 08:00:00',
                    type: 'komentar',
                    read: false
                }
            ];

            // Count unread notifications
            const unreadCount = mockNotifications.filter(n => !n.read).length;
            updateNotificationCount(unreadCount);
        }, 500);
    }

    // Auto-refresh notifications every 30 seconds
    function startAutoRefresh() {
        setInterval(function() {
            loadNotifications();
        }, 30000); // 30 seconds
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initNotificationBell();
            startAutoRefresh();
        });
    } else {
        initNotificationBell();
        startAutoRefresh();
    }

})();
